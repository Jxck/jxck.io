February 7, 2016

# The Error Model

Midori was written in an ahead-of-time compiled, type-safe language based on C# .
Aside from our microkernel, the whole system was written in it, including drivers, the domain kernel, and all user code.

Midori は、 ahead-of-time コンパイル、型安全な、 C# ベースの言語で書かれています。
マイクロカーネル以外にも、システム全体のドライバ、ドメインカーネル、およびすべてのユーザーコードが、それで書かれています。

I've hinted at a few things along the way and now it's time to address them head-on.
The entire language is a huge space to cover and will take a series of posts.
First up? The Error Model.

この言語を作った知見を書く。最初はエラーモデルから。


The way errors are communicated and dealt with is fundamental to any language, especially one used to write a reliable operating system.
Like many other things we did in Midori, a "whole system" approach was necessary to getting it right, taking several iterations over several years.
I regularly hear from old teammates, however, that this is the thing they miss most about programming in Midori.
It's right up there for me too.
So, without further ado, let's start.

エラーは、特に、信頼性の高いオペレーティングシステムを記述するために使用される、言語の基本であると扱われます。
私たちは Midori で行った他の多くのものと同様に、 "while system" アプローチを正しく行うために不可欠で、数年にわたって数回の反復を繰り返してきました。

私は常々、古いチームメイトから聞いていました、しかし、これは Midori でのプログラミングについての最も見落としがちな点です。

それが道を照らしてくれました。

前置きはこのへんにして、始めましょう。


## Introduction

The basic question an Error Model seeks to answer is: how do "errors" get communicated to programmers and users of the system? Pretty simple, no? So it seems.

まず、エラーモデルについての基本の問いとして、"エラーはどうプログラマやユーザとコミュニケーションすべきか"がある。シンプルだ。違うかい？

One of the biggest challenges in answering this question turns out to be defining what an error actually is.
Most languages lump bugs and recoverable errors into the same category, and use the same facilities to deal with them.
A null dereference or out-of-bounds array access is treated the same way as a network connectivity problem or parsing error.
This consistency may seem nice at first glance, but it has deep-rooted issues.
In particular, it is misleading and frequently leads to unreliable code.

この質問に答える中で最大の課題の 1 つは、そもそもエラーとは何であるかを定義することだ。
ほとんどの言語は、バグや回復可能なエラーを同じカテゴリにひとまとめにし、同じ仕組みを使ってそれを処理します。
null 参照または配列の範囲外アクセスは、ネットワーク接続の失敗やパースエラーと同じように扱われます。
この一貫性は一見素敵に見えるかもしれませんが、それは根深い問題があります。
特に、それは誤解を招くおそれがあり、頻繁に信頼できないコードにつながります。

Our overall solution was to offer a two-pronged error model.
On one hand, you had fail-fast - we called it abandonment - for programming bugs.
And on the other hand, you had statically checked exceptions for recoverable errors.
The two were very different, both in programming model and the mechanics behind them.
Abandonment unapologetically tore down the entire process in an instant, refusing to run any user code while doing so.
(Remember, a typical Midori program had many small, lightweight processes.)
Exceptions, of course, facilitated recovery, but had deep type system support to aid checking and verification.

総合的な解決策は、 2 つの側面からのエラーモデルを提供することでした。
まず、プログラミングのバグを Fail-Fast で扱う(以下 "中断")。
他方で、静的解析により回復可能なエラーによる例外をチェックします。
両者は、プログラミングモデルとその背後にあるメカニズムの両方で、非常に異なっていました。
中断は迷うこと無く、ユーザーコードを実行することを拒否し、瞬時にプロセス全体を落とします。
(なお、典型的な Midori のプログラムは、多くの小さな軽量プロセスを持っています。)

This journey was long and winding. To tell the tale, I've broken this post into six major areas:

この旅は長く曲がりくねりました。物語を伝えるために、私はこの問題を 6 つの領域に分解しました:

- Ambitions and Learnings
- Bugs Aren't Recoverable Errors!
- Reliability, Fault-Tolerance, and Isolation
- Bugs: Abandonment, Assertions, and Contracts
- Recoverable Errors: Type-Directed Exceptions
- Retrospective and Conclusions

In hindsight, certain outcomes seem obvious.
Especially given modern systems languages like Go and Rust.
But some outcomes surprised us.
I'll cut to the chase wherever I can but I'll give ample back-story along the way.
We tried out plenty of things that didn't work, and I suspect that's even more interesting than where we ended up when the dust settled.

結果的には、一定の成果が明白なようです。
特に GO や Rust のような現代のシステム言語が与えられました。
しかし、いくつかの成果が私たちを驚かせました。
すあやく本題に入りますが、必要に応じて途中で十分なバックストーリーをあげていきます。
我々は動作なかった多くのことを試しました、落ち着いたころは、我々がたどり着いたところよりもさらに面白いと思います。

## Ambitions and Learnings

Let's start by examining our architectural principles, requirements, and learnings from existing systems.
まず、設計原則、要件、および既存のシステムの知見を調べることから始めましょう。


### Principles

As we set out on this journey, we called out several requirements of a good Error Model:
私たちはこの旅のはじめに、良いエラーモデルのいくつかの要件を見てみます。

- Usable. It must be easy for developers to do the "right" thing in the face of error, almost as if by accident.
A friend and colleague famously called this falling into the The Pit of Success.
The model should not impose excessive ceremony in order to write idiomatic code.
Ideally it is cognitively familiar to our target audience.

- Usable: エラーに直面した開発者はほとんど偶然かのように、"正しい" ことを容易に行えなければなりません。
これは "falling into the Pit of Success" と呼ばれます。
モデルは、慣用的なコードを記述するために、過剰なおまじないを課すべきではありません。
理想的には、それが私たちのターゲットとするユーザーに認知よく知られるべきです。


- Reliable. The Error Model is the foundation of the entire system's reliability.
We were building an operating system, after all, so reliability was paramount.
You might even have accused us as obsessively pursuing extreme levels of it.
Our mantra guiding much of the programming model development was "correct by construction."

- Reliable: エラーモデルは、システム全体の信頼性の基礎となるものです。
我々は、オペレーティングシステムを構築したため、とりわけ信頼性が最優先事項でした。
私たちが、極端なレベルで執拗に信頼性を追求していると、私たちを非難する可能性があります。
プログラミングモデルの開発において、私たちの指針は、"correct by construction" でした。


- Performant. The common case needs to be extremely fast.
That means as close to zero overhead as possible for success paths.
Any added costs for failure paths must be entirely "pay-for-play."
And unlike many modern systems that are willing to overly penalize error paths,
we had several performance-critical components for which this wasn't acceptable,
so errors had to be reasonably fast too.

- Performant: コモンケースは非常に高速である必要があります。
つまり、サクセスパスでは、できるだけゼロオーバーヘッドに近いことを意味します。
エラーパスへの追加費用は、完全に "pay-for-play" でなければなりません。
そして、エラーパスに対して過度にペナルティーをつけたがる多くの近代的なシステムとは異なり、
我々はこれが許容されなかったいくつかのパフォーマンスクリティカルなコンポーネントを持っていたので、
エラーは適度に高速でなければなりませんでした。


- Concurrent. Our entire system was distributed and highly concurrent.
This raises concerns that are usually afterthoughts in other Error Models.
They needed to be front-and-center in ours.

- Concurrent: 私たちのシステム全体は、分散性と高い並行性を持ちました。
これは、通常、他のエラーモデルにおける後づけされている懸念を提起します。
私たちにとっては、関心の中心にある必要がありました。


- Diagnosable. Debugging failures, either interactively or after-the-fact, needs to be productive and easy.
- Diagnosable: 障害のデバッグは、対話的であれ事後であれ、生産的かつ簡単にする必要があります。

- Composable. At the core, the Error Model is a programming language feature, sitting at the center of a developer's expression of code.
As such, it had to provide familiar orthogonality and composability with other features of the system.
Integrating separately authored components had to be natural, reliable, and predictable.

- Composable: コアとして、エラーモデルは、プログラミングの言語機能であり、コードの表現の中心にあるべきです。
したがって、システムの他の機能との、直交性と親和性を提供する必要があります。
異なる開発者のコンポーネントを、自然に、信頼でき、予測可能な形で統合できる必要があります。

It's a bold claim, however I do think what we ended up with succeeded across all dimensions.
それは大胆な主張です、しかし私たちはすべての側面で成功したものと思います。

### Learnings

Existing Error Models didn't meet the above requirements for us.
At least not fully.
If one did well on a dimension, it'd do poorly at another.
For instance, error codes can have good reliability, but many programmers find them error prone to use; further, it's easy to do the wrong thing - like forget to check one - which clearly violates the "pit of success" requirement.

既存のエラーモデルは、私たちのために上記の要件を満たしていませんでした。
少なくともではない完全には。
一つの側面でうまくいっても、別の面では不十分でした。
たとえば、エラーコードは、良好な信頼性を持つことができますが、多くのプログラマがそれを使用しがちになります、より一層間違ったことがしやすくなります。たとえば - チェックのし忘れ - これは明らかに "pit of success" に違反します。

Given the extreme level of reliability we sought, it's little surprise we were dissatisfied with most models.
私たちが求めた信頼性の極端なレベルを考えると、ほとんどのモデルに不満があることは、驚くことではありません。

If you're optimizing for ease-of-use over reliability, as you might in a scripting language, your conclusions will differ significantly.
Languages like Java and C# struggle because they are right at the crossroads of scenarios - sometimes being used for systems, sometimes being used for applications - but overall their Error Models were very unsuitable for our needs.

あなたが、スクリプト言語などで、信頼性以上にに使いやすさのために最適化している場合は、結論は大きく異なります。
Java と C# の闘争のような言語彼らはシナリオの交差点の過度にあるため、- システムに使用されることもあれば、アプリケーションに使用されていることもある - 全体的に、それらのエラーモデルは、私たちのニーズに適していませんでした。

Finally, also recall that this story began in the mid-2000s timeframe, before Go, Rust, and Swift were available for our consideration.
These three languages have done some great things with Error Models since then.
あと、この話が 2000 年代半ばの時間枠に始まり、Go, Rust, Swift は、私たちの検討のために利用可能になる前であったことを思い出してください。
これらの 3 つの言語は、それまでの、エラーモデルと比べると、いくつかの偉大なことを成し遂げています。


### Error Codes

Error codes are arguably the simplest Error Model possible.
The idea is very basic and doesn't even require language or runtime support.
A function just returns a value, usually an integer, to indicate success or failure:

エラーコードは間違いなく可能な限り単純なエラーモデルです。
アイデアは非常に基本的であり、言語やランタイムサポートを必要としません。
関数は単に成功または失敗を示すために、通常は整数値を返します。

```
int foo() {
  // <try something here>
  if (failed) {
    return 1;
  }
  return 0;
}
```

This is the typical pattern, where a return of 0 means success and non-zero means failure. A caller must check it:
これは、 0 が成功を意味し、非ゼロは失敗を意味する典型的なパターンです。呼び出し側はそれをチェックする必要があります。

```
int err = foo();
if (err) {
  // Error! Deal with it.
}
```

Most systems offer constants representing the set of error codes rather than magic numbers.
There may or may not be functions you can use to get extra information about the most recent error (like errno in standard C and GetLastError in Win32).
A return code really isn't anything special in the language - it's just a return value.

ほとんどのシステムでは、マジックナンバーではなく、エラーコードのセットを表す定数を提供しています。
(C における errno や Win32 の GetLastError などのような)最新のエラーに関する追加情報を取得するために使用できる機能がある場合もあります。
リターンコードは、実際の言語で何も特別なことではない - ただの戻り値です。

C has long used error codes.
As a result, most C-based ecosystems do.
More low-level systems code has been written using the return code discipline than any other.
Linux does, as do countless mission-critical and realtime systems.
So it's fair to say they have an impressive track record going for them!

C は、長いことエラーコードを使用しています。
その結果、ほとんどの C ベースのエコシステムが使っています。
もっと低レベルのシステムコードは、他よりも厳しい規律でリターンコードを使って書かれています。
Linux が行っているように、数え切れないミッションクリティカルなリアルタイムシステムがそうであるように。
だから、彼らは素晴らしいトラックレコードを持っていると言えます。


On Windows, HRESULTs are equivalent.
An HRESULT is just an integer "handle" and there are a bunch of constants and macros in winerror.h like S_OK, E_FAULT, and SUCCEEDED(), that are used to create and check values.
The most important code in Windows is written using a return code discipline.
No exceptions are to be found in the kernel.
At least not intentionally.

Windows では、の HRESULT がそれにあたります。
HRESULT は、値を生成したりチェックする単なる整数のハンドラであり、 S_OK, E_FAULT, SUCCEEDED() など、いくつかの定数とマクロが winerror.h に定義されているだけです。
Windows の中で最も重要なコードはリターンコードの規律を適用して書かれています。
カーネル内では例外は見当たりません。
少なくとも意図的でないものは。


In environments with manual memory management, deallocating memory on error is uniquely difficult.
Return codes can make this (more) tolerable.
C++ has more automatic ways of doing this using RAII, but unless you buy into the C++ model whole hog - which a fair number of systems programmers don't - then there's no good way to incrementally use RAII in your C programs.

手動メモリ管理の環境では、エラー時にメモリの割り当てを解除することは一義的には困難です。
リターンコードは、これを(より)許容することができます。
C++ は RAII 用いてこれをより自動的に行う方法があります、しかし -かなりのシステムプログラマが避けている- C++ モデルに完全に浸かる必要が有ります。 そして、 C プログラム内で徐々に RAII を使用するための良い方法はありません。

More recently, Go has chosen error codes.
Although Go's approach is similar to C's, it has been modernized with much nicer syntax and libraries.

より最近では、移動はエラーコードを選択しました。
Go のアプローチは C と近いですが、それは非常に良い構文とライブラリでモダンに設計されています。

Many functional languages use return codes disguised in monads and named things like Option<T>, Maybe<T>, or Error<T>, which, when coupled with a dataflow-style of programming and pattern matching, feel far more natural.
This approach removes several major drawbacks to return codes that we're about to discuss, especially compared to C.
Rust has largely adopted this model but has dome some exciting things with it for systems programmers.

多くの関数型言語は、リターンコードをモナドや Option<T>, Maybe<T>, Error<T> と名付けられたもので包んで用いており、プログラミングのデータフロースタイルとパターンマッチングと組み合わせると、遥かに自然に感じられます。

このアプローチは、特に C と比べて、私たちが議論しようとしているリターンコードの、いくつかの主要な欠点を除去します
Rust はこのモデルを広く採用したが、システムプログラマのためのいくつかのエキサイティングなものを持っていました。 TODO: (dome ?)

Despite their simplicity, return codes do come with some baggage; in summary:
そのシンプルにもかかわらず、リターンコードは、いくつかの荷物が付属しています。要約すれば:

- Performance can suffer.
- Programming model usability can be poor.
- The biggie: You can accidentally forget to check for errors.

- パフォーマンスが低下する可能性があります。
- プログラミングモデルの使い勝手が悪くなりえます。
- とても重要: 誤ってエラーをチェックし忘れることがあります。


Let's discuss each one, in order, with examples from the languages cited above.
それぞれ、順番に、例にを交え、説明しましょう。


## Performance

Error codes fail the test of "zero overhead for common cases; pay for play for uncommon cases":
エラーコードでは "コモンケースではゼロオーバーヘッド、そうでない場合追加を払う" を実現できない。


1. There is calling convention impact. You now have two values to return (for non-void returning functions): the actual return value and the possible error. This burns more registers and/or stack space, making calls less efficient. Inlining can of course help to recover this for the subset of calls that can be inlined.

1. 呼び出し規約の影響があります。(非 void 関数で)実際の値とエラーの、二つの戻り値があるとします。これは、より多くのスタック領域を使用し、呼び出し効率を下げます。インライン化は、呼び出しのサブセットをインライン化するため、これを防ぐ助けになります。


:TODO :HERE

2. There are branches injected into callsites anywhere a callee can fail.
I call costs like this "peanut butter," because the checks are smeared across the code, making it difficult to measure the impact directly.
In Midori we were able to experiment and measure, and confirm that yes, indeed, the cost here is nontrivial.
There is also a secondary effect which is, because functions contain more branches, there is more risk of confusing the optimizer.

2. どこにでも呼び出し先が失敗することが callsites に注入ブランチがあります。
チェックは、それが困難に直接影響を測定すること、コード全体に塗りつけているので、私はこの"ピーナッツバター"のようなコストを呼び出します。
Midori では、実験や測定、およびはい、確かに、ここでのコストは自明であることを確認することができました。
関数が複数のブランチが含まれているため、オプティマイザを混乱のより多くのリスクがある、ある副次的な効果もあります。


This might be surprising to some people, since undoubtedly everyone has heard that "exceptions are slow."
It turns out that they don't have to be.
And, when done right, they get error handling code and data off hot paths which increases I-cache and TLB performance,
compared to the overheads above, which obviously decreases them.

これは間違いなく、誰もがいると聞いているので、一部の人には驚くべきことかもしれません"例外がスローされます。"それは彼らがする必要がないことが判明します。
右行われたときと、彼らは明らかにそれらを減少させる上記のオーバーヘッドに比べ、 I キャッシュと TLB の性能を向上させ、ホットパスオフエラー処理コードとデータを取得します。

Many high performance systems have been built using return codes, so you might think I'm nitpicking.
As with many things we did, an easy criticism is that we took too extreme an approach.
But the baggage gets worse.

多くの高性能システムは、リターンコードを使用して構築されているので、あなたは、私はつまらないことにこだわると思うかもしれません。
私たちが行った多くのものと同じように、簡単な批判は、我々はあまりにも極端なアプローチを取ったということです。
しかし、荷物が悪化します。


## Forgetting to Check Them

It's easy to forget to check a return code. For example, consider a function:
リターンコードはチェックすることを忘れがちです。たとえば、関数を考えてみます。


```
int foo() { ... }
```

Now at the callsite, what if we silently ignore the returned value entirely, and just keep going?
今呼び出し場所で、私たちは静かに完全に戻り値を無視した場合、ちょうど続けますか？


```
foo();
// Keep going -- but foo might have failed!
```

At this point, you've masked a potentially critical error in your program.
This is easily the most vexing and damaging problem with error codes.
As I will show later, option types help to address this for functional languages.
But in C-based languages, and even Go with its modern syntax, this is a real issue.

この時点で、あなたはあなたのプログラムに潜在的に重大なエラーがマスクされてきました。
これは、簡単にエラーコードと最も厄介かつ有害な問題です。
私は、後に表示されるように、オプションの種類は、関数型言語のためにこれに対処するのに役立ちます。
しかし、 C ベースの言語で、さらにその現代的な構文で行く、これが本当の問題です。


This problem isn't theoretical.
I've encountered numerous bugs caused by ignoring return codes and I'm sure you have too.
Indeed, in the development of this very Error Model, my team encountered some fascinating ones.
For example, when we ported Microsoft's Speech Server to Midori, we found that 80% of Taiwan Chinese (zh-tw) requests were failing.
Not failing in a way the developers immediately saw, however; instead, clients would get a gibberish response.
At first, we thought it was our fault.
But then we discovered a silently swallowed HRESULT in the original code.
Once we got it over to Midori, the bug was thrown into our faces, found, and fixed immediately after porting.
This experience certainly informed our opinion about error codes.

この問題は、理論的ではありません。
私は、リターンコードを無視することによって引き起こされる多数のバグに遭遇していると私はあなたも持っていると確信しています。
確かに、この非常にエラーモデルの開発に、私のチームはいくつかの魅力的なものに遭遇しました。
私たちは Midori に Microsoft のスピーチサーバーを移植したときにたとえば、我々は台湾の中国語( ZH-TW )の要求の 80 ％が失敗したことがわかりました。
しかし、開発者がすぐに見たように失敗したわけではありません。代わりに、クライアントはちんぷんかんぷん応答を取得することになります。
最初に、我々はそれが私たちのせいだと思いました。
しかし、その後、私たちは、元のコードで静かに飲み込んだ HRESULT を発見しました。
私たちは Midori にそれを乗り越えたら、バグは、私たちの顔に投げ発見し、移植直後に修正されました。
この経験は確かにエラーコードについての我々の意見を伝えました。


It's surprising to me that Go made unused imports an error, and yet missed this far more critical one.
So close!

これは、 Go は、未使用の輸入にエラーをした、そしてまだこのはるかに重要なものを逃した私には驚きです。
だから近いです！


It's true you can add a static analysis checker, or maybe an "unused return value" warning as most commercial C++ compilers do.
But once you've missed the opportunity to add it to the core of the language, as a requirement, none of those techniques will reach critical mass due to complaints about noisy analysis.

これは、ほとんどの市販の C++ コンパイラがそうであるようにあなたが静的解析チェッカ、または多分"未使用の戻り値"警告を追加することができます本当です。
あなたが要件として、言語のコアに追加する機会を逃してきたしかし、一度、これらの技術のいずれも、ノイズの多い分析に関する苦情にクリティカルマスに到達しません。


For what it's worth, forgetting to use return values in our language was a compile time error.
You had to explicitly ignore them; early on we used an API for this, but eventually devised language syntax - the equivalent of >/dev/null:

何が価値がある、私たちの言語で戻り値を使用するのを忘れるために、コンパイル時エラーがありました。
あなたが明示的にそれらを無視しなければなりませんでした。初期の私たちに、このための API を使用したが、最終的に考案された言語の構文 - >を/ dev / null の同等:

```
ignore foo();
```

We didn't use error codes, however the inability to accidentally ignore a return value was important for the overall reliability of the system.
How many times have you debugged a problem only to find that the root cause was a return value you forgot to use? There have even been security exploits where this was the root cause.
Letting developers say ignore wasn't bulletproof, of course, as they could still do the wrong thing.
But it was at least explicit and auditable.

私たちは、しかし、誤って戻り値を無視することができないことは、システム全体の信頼性のために重要であった、エラーコードを使用していませんでした。
どのように多くの時間があなただけの根本的な原因は、使用するのを忘れて、戻り値であったことを見つけるために問題をデバッグしていますか？でも、これは根本的な原因だったセキュリティ攻撃がありました。
まかせ開発者は、彼らはまだ間違ったことを行うことができますように、当然のことながら、防弾ではありませんでした無視と言います。
しかし、それは、少なくとも明示的かつ監査可能でした。


## Programming Model Usability

In C-based languages with error codes, you end up writing lots of hand-crafted if checks everywhere after function calls.
This can be especially tedious if many of your functions fail which, in C programs where allocation failures are also communicated with return codes, is frequently the case.
It's also clumsy to return multiple values.

C ベースの言語のエラーコードは、毎回関数呼び出しの後に自分で沢山の if チェックを書ききる必要が有ります。
あなたの機能の多くは、割り当て障害はまた、リターンコードに連通している C プログラムでは、頻繁にケースである、失敗した場合、これは特に面倒なことができます。
これは、複数の値を返すためにも不器用です。

A warning: this complaint is subjective.
In many ways, the usability of return codes is actually elegant.
You reuse very simple primitives - integers, returns, and if branches - that are used in myriad other situations.
In my humble opinion, errors are an important enough aspect of programming that the language should be helping you out.

警告:この苦情は主観的なものです。
多くの点で、リターンコードの使いやすさは、実際にはエレガントです。
整数、返品、および支店の場合 - - 無数の他の状況で使用されているあなたは非常に単純なプリミティブを再利用します。
私の愚見では、エラーが言語があなたを助けることがなければならないプログラミングの重要な十分な局面です。

Go has a nice syntactic shortcut to make the standard return code checking slightly more pleasant:
Go が少しより快適なチェックの標準的なリターンコードを作成するための良い構文のショートカットを持っています。

```
if err := foo(); err != nil {
  // Deal with the error.
}
```

Notice that we've invoked foo and checked whether the error is non-nil in one line. Pretty neat.
我々が foo を呼び出し、エラーが 1 行で非 nil であるかどうかをチェックしたことに注意してください。かなりきちんと。

The usability problems don't stop there, however.
ユーザビリティの問題は、しかし、そこに停止しないでください。

It's common that many errors in a given function should share some recovery or remediation logic.
Many C programmers use labels and gotos to structure such code.
For example:
これは、与えられた関数には多くの誤りがいくつかの回復または修復ロジックを共有する必要があることが一般的です。
多くの C プログラマは、このようなコードを構造化するために、ラベルとの goto を使用しています。
例えば:

```
int error;

// ...

error = step1();
if (error) {
  goto Error;
}

// ...

error = step2();
if (error) {
  goto Error;
}

// ...

// Normal function exit.
return 0;

// ...
Error:
// Do something about `error`.
return error;
```

Needless to say, this is the kind of code only a mother could love.
言うまでもなく、これは母親だけが愛することができ、コードの一種です。

In languages like D, C# , and Java, you have finally blocks to encode this "before scope exits" pattern more directly.
Similarly, Microsoft's proprietary extensions to C++ offer `__finally`, even if you're not fully buying into RAII and exceptions.
And D provides scope and Go offers defer.
All of these help to eradicate the goto Error pattern.
D 、 C# の、および Java などの言語では、より直接的に、この"スコープが終了する前に "パターンを符号化するための finally ブロックを持っています。
同様に、 C++ のオファー `__finally`に対する Microsoft の独自の拡張は、あなたが完全に RAII と例外に購入していない場合でも。
そして、 D は範囲を提供し、 Go は延期を提供しています。
これらのすべては、 goto 文のエラーパターンを根絶するのに役立ちます。

Next, imagine my function wants to return a real value and the possibility of an error? We've burned the return slot already so there are two obvious possibilities:
次に、私の関数は、実際の値との誤差の可能性を返すように望んでいると想像？我々は 2 つの明白な可能性があるので、既に返却口を燃やしました:

1. We can use the return slot for one of the two values (commonly the error), and another slot - like a pointer parameter - for the other of the two (commonly the real value).
This is the common approach in C.
1. ポインタパラメータのような - - 2 の他のための(一般的に実際の値)私たちは、 2 つの値(一般エラー)の一つであり、他のスロットの戻りスロットを使用することができます。
これは、 C で一般的なアプローチであります

2. We can return a data structure that carries the possibility of both in its very structure.
As we will see, this is common in functional languages.
But in a language like C, or Go even, that lacks parametric polymorphism, you lose typing information about the returned value, so this is less common to see.
C++ of course adds templates, so in principle it could do this, however because it adds exceptions, the ecosystem around return codes is lacking.
2. 私たちは、その非常に構造体の両方の可能性を運ぶデータ構造を返すことができます。
私達が見るように、これは関数型言語では一般的です。
しかし、 C のような言語、あるいは移動中に、それはパラメトリック多型を欠いている、あなたは、返された値に関する入力情報を失うので、これは見ることがあまり一般的です。
それは、リターンコードの周りの生態系が欠けているの例外を追加しますただしので、原理的には、これを行うことができますので、もちろん C++ は、テンプレートを追加します。

In support of the performance claims above, imagine what both of these do to your program's resulting assembly code.
上記のパフォーマンスの主張を支持して、これらの両方は、プログラムの結果のアセンブリコードに何をするか想像してみてください。

## Returning Values "On The Side"

An example of the first approach in C looks like this:
C の最初のアプローチの例は次のようになります。

```
int foo(int* out) {
  // <try something here>
  if (failed) {
    return 1;
  }
  *out = 42;
  return 0;
}
```

The real value has to be returned "on the side," making callsites clumsy:
実際の値は callsites が不器用な作り"、側面に"返却する必要があります。

```
int value;
int ret = foo(&value);
if (ret) {
  // Error! Deal with it.
}
else {
  // Use value...
}
```

In addition to being clumsy, this pattern perturbs your compiler's definite assignment analysis which impairs your ability to get good warnings about things like using uninitialized values.
不器用であることに加えて、このパターンは初期化されていない値を使用してのようなものについての良い警告を得るためにあなたの能力を損なうコンパイラの明確な代入分析を混乱させる。

Go also takes aim at this problem with nicer syntax, thanks to multi-valued returns:
、またよりよい構文を使用してこの問題を目指す取り多値リターンのおかげで行きます:

```
func foo() (int, error) {
  if failed {
    return 0, errors.New("Bad things happened")
  }
  return 42, nil
}
```

And callsites are much cleaner as a result.
Combined with the earlier feature of single-line if checking for errors - a subtle twist, since at first glance the value return wouldn't be in scope, but it is - this gets a touch nicer:
そして callsites は、結果として非常にクリーンです。
エラーのチェック場合は、単一行の以前の特徴と組み合わせること - 微妙なねじれを、一見値のリターンがスコープ内ではないので、それがある - これは、タッチよりよい取得します。

```
if value, err := foo(); err != nil {
  // Error! Deal with it.
} else {
  // Use value ...
}
```

Notice that this also helps to remind you to check the error.
It's not bulletproof, however, because functions can return an error and nothing else, at which point forgetting to check it is just as easy as it is in C.
これは、エラーをチェックするためにあなたを思い出させるのに役立つことに注意してください。
関数は、それが C であると同じくらい簡単であることを確認し忘れ時点でエラーと他には何を返すことができるので、しかし、防弾ではありません

As I mentioned above, some would argue against me on the usability point.
Especially Go's designers, I suspect.
A big appeal to Go using error codes is as a rebellion against the overly complex languages in today's landscape.
We have lost a lot of what makes C so elegant - that you can usually look at any line of code and guess what machine code it translates into.
I won't argue against these points.
In fact, I vastly prefer Go's model over both unchecked exceptions and Java's incarnation of checked exceptions.
Even as I write this post, having written lots of Go lately, I look at Go's simplicity and wonder, did we go too far with all the try and requires and so on that you'll see shortly? I'm not sure.
Go's error model tends to be one of the most divisive aspect of the language; it's probably largely because you can't be sloppy with errors as in most languages, however programmers really did enjoy writing code in Midori's.
In the end, it's hard to compare them.
I'm convinced both can be used to write reliable code.
私は前述したように、いくつかは、ユーザビリティの点で私に対して主張するだろう。
特に移動のデザイナーは、私は疑います。
エラーコードを使用して行くための大きな魅力は、今日の風景の中に過度に複雑な言語に対する反乱ようです。
あなたは、通常のコードの任意の行を見て、それがに変換するもののマシンコードを推測することができる - 私たちは、 C はとてもエレガントになり何の多くを失っています。
私はこれらの点に反論しません。
実際に、私は非常に両方のチェック例外とチェック例外の Java の化身の上に行くのモデルを好みます。
私は最近、 Go の書かれた多くを持つ、この記事を書いたとしても、私は Go のシンプルさと不思議を見て、私たちは、あなたがすぐにわかりますように、すべての試行で行き過ぎと必要としたのですか？よく分かりません。
 Go の誤差モデルは、言語の中で最も分裂局面の 1 になる傾向があります。あなたはしかし、プログラマが本当に Midori の中にコードを書いて楽しんでいた、ほとんどの言語のようにエラーが発生したずさんなことはできませんので、それは主に、おそらくです。
最後に、それはそれらを比較するのは難しいです。
私は両方が信頼性の高いコードを書くのに使用することができる確信しています。

## Return Values in Data Structures

Functional languages address many of the usability challenges by packaging up the possibility of either a value or an error, into a single data structure.
Because you're forced to pick apart the error from the value if you want to do anything useful with the value at the callsite - which, thanks to a dataflow style of programming, you probably will - it's easy to avoid the killer problem of forgetting to check for errors.
関数型言語は、単一のデータ構造に、値またはエラーのいずれかの可能性をパッケージングすることにより、ユーザビリティの課題の多くに対処します。
それは忘却のキラー問題を回避するのは簡単です - プログラミングのデータフロースタイル、あなたはおそらく意志に、おかげで - あなたは呼び出し場所での値で有用な何かを行いたい場合は、値からの誤差を離れて選ぶことを余儀なくしているので、エラーをチェックします。

For an example of a modern take on this, check out Scala's Option type.
The unfortunate news is that some languages, like those in the ML family and even Scala (thanks to its JVM heritage), mix this elegant model with the world of unchecked exceptions.
This taints the elegance of the monadic data structure approach.
この上の近代的なテイクの例については、 Scala のオプションの種類をチェックしてください。
残念なニュースが(その JVM 遺産のおかげで) ML ファミリーのもの、さらには Scala のようないくつかの言語は、非チェック例外の世界とこのエレガントなモデルを混在させることです。
これは、モナドデータ構造アプローチのエレガンスは汚染します。

Haskell does something even cooler and gives the illusion of exception handling while still using error values and local control flow:
Haskell はあってもクーラー何かをしてもエラー値とローカル制御フローを使用しながら、例外処理の錯覚を与えます:

> There is an old dispute between C++ programmers on whether exceptions or error return codes are the right way.
Niklas Wirth considered exceptions to be the reincarnation of GOTO and thus omitted them in his languages.
Haskell solves this problem a diplomatic way: Functions return error codes, but the handling of error codes does not uglify the code.
>例外やエラーリターンコードが正しい方法であるかどうかを上の C++ プログラマの間の古い論争があります。
ニクラスヴィルトは、例外が GOTO の生まれ変わりであると考えられ、したがって、彼の言語でそれらを省略しました。
Haskell はこの問題を外交的な方法を解決:関数は、エラーコードを返しますが、エラーコードの取り扱いは、コードを醜くするしません。

The trick here is to support all the familiar throw and catch patterns, but using monads rather than control flow.
ここでのトリックは、すべてのおなじみのスローとキャッチパターンをサポートすることですが、モナドではなく、制御フローを使用して。

Although Rust also uses error codes it is also in the style of the functional error types.
For example, imagine we are writing a function named bar in Go: we'd like to call foo, and then simply propagate the error to our caller if it fails:
Rust にもエラーコードを使用していますが、それは機能的なエラータイプのスタイルでもあります。
たとえば、私たちはゴーで関数という名前のバーを書いていると想像:それが失敗した場合、私たちが foo を呼び出し、その後、単に私たちの呼び出し側にエラーを伝播したいと思います:

```
func bar() error {
  if value, err := foo(); err != nil {
    return err
  } else {
    // Use value ...
  }
}
```

The longhand version in Rust isn't any more concise.
It might, however, send C programmers reeling with its foreign pattern matching syntax (a real concern but not a dealbreaker).
Anyone comfortable with functional programming, however, probably won't even blink, and this approach certainly serves as a reminder to deal with your errors:
Rust の手書きのバージョンは、任意のより簡潔ではありません。
それは、しかし、その外国のパターンマッチング構文(現実的な懸念ではなく dealbreaker )で動揺 C プログラマを送信することがあります。
関数型プログラミングで快適誰もが、しかし、おそらく点滅しなくなり、このアプローチは確かにあなたのエラーに対処するためのリマインダとして機能します:

```
fn bar() -> Result<(), Error> {
  match foo() {
    Ok(value) => /* Use value ... */,
    Err(err) => return Err(err)
  }
}
```

But it gets better. Rust has a try! macro that reduces boilerplate like the most recent example to a single expression:
しかし、それは良くなります。 Rust は、 try を持っています！単一の式に最も最近の例のような決まり文句を低減するマクロ:

```
fn bar() -> Result<(), Error> {
  let value = try!(foo);
  // Use value ...
}
```

This leads us to a beautiful sweet spot.
It does suffer from the performance problems I mentioned earlier, but does very well on all other dimensions.
It alone is an incomplete picture - for that, we need to cover fail-fast (a.k.a.
abandonment) - but as we will see, it's far better than any other exception-based model in widespread use today.
これは、美しいスイートスポットに私たちを導きます。
それは私が前述したパフォーマンスの問題に苦しむんが、他のすべての寸法に非常によくありません。
それだけでは不完全な絵である - そのために、我々はフェイルファスト(別名カバーする必要があります
中断) - しかし、私たちが見るように、それが今日広く使用されている他の例外ベースのモデルよりもはるかに良いです。

## Exceptions

The history of exceptions is fascinating.
During this journey I spent countless hours retracing the industry's steps.
That includes reading some of the original papers - like Goodenough's 1975 classic, Exception Handling: Issues and a Proposed Notation - in addition to looking at the approaches of several languages: Ada, Eiffel, Modula-2 and 3, ML, and, most inspirationally, CLU.
Many papers do a better job than I can summarizing the long and arduous journey, so I won't do that here.
Instead, I'll focus on what works and what doesn't work for building reliable systems.
例外の歴史は魅力的です。
この旅の間、私は業界のステップを辿り数え切れないほどの時間を過ごしました。
最も感激させるように、エイダ、エッフェル、の Modula-2 および 3 、 ML 、および: - 加えて、いくつかの言語のアプローチを見に問題と提案表記:グッドイナフの 1975 古典的な例外処理のように - それは、元の論文のいくつかを読ん含み、 CLU 。
多くの論文は、私は長い骨の折れる旅を要約することができますより良い仕事をするので、私はそれここで行うことはありません。
代わりに、私はどのような作品に焦点を当てますと信頼性の高いシステムを構築するために何を動作しません。

Reliability is the most important of our requirements above when developing the Error Model.
If you can't react appropriately to failures, your system, by definition, won't be very reliable.
Operating systems generally speaking need to be reliable.
Sadly, the most commonplace model - unchecked exceptions - is the worst you can do in this dimension.
信頼性は、エラーモデルを開発する際に上記の我々の要求の中で最も重要です。
あなたが障害に適切に対応できない場合は、お使いのシステムは、定義によって、非常に信頼されません。
オペレーティングシステムは、一般的に信頼性の必要性を話します。
悲しいことに、最もありふれたモデル - 未確認の例外は、 - あなたはこの次元で行うことができます最悪です。

For these reasons, most reliable systems use return codes instead of exceptions.
They make it possible to locally reason about and decide how best to react to error conditions.
But I'm getting ahead of myself.
Let's dig in.
これらの理由から、最も信頼性の高いシステムではなく、例外のリターンコードを使用します。
彼らは約局部的な理由にことを可能にするとエラー状態に反応するように最善の方法を決定します。
しかし、私は先に自分の取得しています。
それでは、で掘るましょう。

## Unchecked Exceptions

A quick recap.
In an unchecked exceptions model, you throw and catch exceptions, without it being part of the type system or a function's signature.
For example:
迅速な要約。
チェック例外モデルでは、あなたはそれが型システムまたは関数のシグネチャの一部であることなく、例外をスローし、キャッチ。
例えば:

```
// Foo throws an unhandled exception:
void Foo() {
  throw new Exception(...);
}

// Bar calls Foo, and handles that exception:
void Bar() {
  try {
    Foo();
  }
  catch (Exception e) {
    // Handle the error.
  }
}

// Baz also calls Foo, but does not handle that exception:
void Baz() {
  Foo(); // Let the error escape to our callers.
}
```

In this model, any function call - and sometimes any statement - can throw an exception, transferring control non-locally somewhere else.
Where? Who knows.
There are no annotations or type system artifacts to guide your analysis.
As a result, it's difficult for anyone to reason about a program's state at the time of the throw, the state changes that occur while that exception is propagated up the call stack - and possibly across threads in a concurrent program - and the resulting state by the time it gets caught or goes unhandled.
このモデルでは、任意の関数呼び出し - 時には任意のステートメントは - どこか非局所的に制御を移す、例外をスローすることができます。
どこで？知るか。
あなたの分析を導くために何の注釈や型システムのアーティファクトはありません。
そしておそらく並行プログラム内のスレッド間で - - と結果の状態によって、誰もがその例外がコールスタックに伝播している間に発生する状態変化、スローの時にプログラムの状態を約推論するためにその結果、それは難しいですそれを取得時間はキャッチまたは未処理になりました。

It's of course possible to try.
Doing so requires reading API documentation, doing manual audits of the code, leaning heavily on code reviews, and a healthy dose of luck.
The language isn't helping you out one bit here.
Because failures are rare, this tends not to be as utterly disastrous as it sounds.
My conclusion is that's why many people in the industry think unchecked exceptions are "good enough." They stay out of your way for the common success paths and, because most people don't write robust error handling code in non-systems programs, throwing an exception usually gets you out of a pickle fast.
Catching and then proceeding often works too.
No harm, no foul.
Statistically speaking, programs "work."
これは試してみるもちろん可能です。
そうすることで、コードレビューに大きく傾いて、コードの手動による監査をやって、 API ドキュメントを読んで必要とし、運の健全な用量。
言語は、 1 ビット、ここであなたを支援されていません。
障害はまれであるので、これは思ったほど全く悲惨なことしない傾向にあります。
私の結論は、業界で多くの人々が非チェック例外があると思う理由だが"十分に良いです。 "ほとんどの人は、例外は通常、高速ピクルスのあなたを取得投げ、非システムのプログラムで強力なエラー処理コードを記述していないので、彼らは、共通の成功パスのあなたの方法の外に滞在し。
キャッチした後、頻繁に進むことはあまりにも動作します。
害なし、ファウル。
統計的に言えば、プログラム "仕事"。

Maybe statistical correctness is okay for scripting languages, but for the lowest levels of an operating system, or any mission critical application or service, this isn't an appropriate solution.
I hope this isn't controversial.
多分統計的正しさは、スクリプト言語のために大丈夫ですが、オペレーティングシステム、または任意のミッションクリティカルなアプリケーションやサービスの最低レベルのために、これは適切な解決策ではありません。
私は、これは論争のではありません願っています。

.NET makes a bad situation even worse due to asynchronous exceptions.
C++ has so-called "asynchronous exceptions" too: these are failures that are triggered by hardware faults, like access violations.
It gets really nasty in .NET, however.
An arbitrary thread can inject a failure at nearly any point in your code.
Even between the RHS and LHS of an assignment! As a result, things that look atomic in source code aren't.
I wrote about this 10 years ago and the challenges still exist, although the risk has lessened as .NET generally learned that thread aborts are problematic.
The new CoreCLR even lacks AppDomains, and the new ASP.NET Core 1.0 stack certainly doesn't use thread aborts like it used to.
But the APIs are still there.
.NET はさらに悪化による非同期例外に悪い状況になります。
C++ は、あまりにも、いわゆる"非同期例外"を持っている:これらは、アクセス違反などのハードウェア障害によってトリガされている障害です。
しかし、.NET で本当に厄介な取得します。
任意のスレッドは、コード内のほぼすべての点での障害を注入することができます。
でも RHS と割り当ての LHS 間！その結果、ソースコード内での原子見るものではありません。
私はこの 10 年ほど前に書いたと.NET は、一般的にスレッドは問題があるアボートことを学んだようなリスクを緩和しているものの、課題はまだ存在しています。
新しい CoreCLR もの AppDomain を欠いているし、新しい ASP.NET コア 1.0 スタックは確かにそれが使用されるようにスレッドが中断されます使用していません。
しかし、 API はまだそこにあります。

There's a famous interview with Anders Hejlsberg, C# 's chief designer, called The Trouble with Checked Exceptions.
From a systems programmer's perspective, much of it leaves you scratching your head.
No statement affirms that the target customer for C# was the rapid application developer more than this:
アンダースヘルスバーグ、 C# のチーフデザイナーで有名なインタビューがあり、チェック済み例外のトラブルと呼ばれます。
システムプログラマーの観点から、それの多くは、あなたの頭を悩まあなたを残します。
声明は、 C# のためのターゲット顧客は、これよりもより迅速なアプリケーション開発者であったことを肯定していません:

> Bill Venners: But aren't you breaking their code in that case anyway, even in a language without checked exceptions? If the new version of foo is going to throw a new exception that clients should think about handling, isn't their code broken just by the fact that they didn't expect that exception when they wrote the code?
>ビル Venners の:しかし、あなたがチェック例外なくても言語で、とにかくその場合には、コードを壊していないですか？ foo の新しいバージョンのクライアントが取り扱いについて考えるべき新しい例外をスローしようとしている場合、彼らはコードを書いたとき、彼らはその例外を期待していなかったという事実によってちょうど壊れた自分のコードではありませんか？

> Anders Hejlsberg : No, because in a lot of cases, people don't care.
They're not going to handle any of these exceptions.
There's a bottom level exception handler around their message loop.
That handler is just going to bring up a dialog that says what went wrong and continue.
The programmers protect their code by writing try finally's everywhere, so they'll back out correctly if an exception occurs, but they're not actually interested in handling the exceptions.
>アンダースヘルスバーグ:いいえ、例ロットで、人々は気にしないので。
彼らは、これらの例外のいずれかを処理するつもりはありません。
彼らのメッセージループの周りのボトムレベルの例外ハンドラがあります。
そのハンドラは、ちょうど何が悪かったのかと言うダイアログを開き、続行しようとしています。
プログラマは、 try 例外が発生した場合、彼らが正常にバックアウトしますので、最終的には、いたるところだが、彼らが実際に例外を処理するには興味がないよを書き込むことによって、自分のコードを保護します。

This reminds me of On Error Resume Next in Visual Basic, and the way Windows Forms automatically caught and swallowed errors thrown by the application, and attempted to proceed.
I'm not blaming Anders for his viewpoint here; heck, for C# 's wild popularity, I'm convinced it was the right call given the climate at the time.
But this sure isn't the way to write operating system code.
これは、 Visual Basic で次の On Error 再開のことを思い出すと、方法 Windows フォームは自動的にキャッチされ、飲み込まアプリケーションによってスローされたエラーをし、続行しようとしました。
私はここで彼の視点のためのアンダースのせいではありませんよ。一体、 C# の野生の人気のために、私はそれが当時の気候与えられた権利の呼び出しだった確信しています。
しかし、これはオペレーティングシステムのコードを書くための方法ではありません。

C++ at least tried to offer something better than unchecked exceptions with its throw exception specifications.
Unfortunately, the feature relied on dynamic enforcement which sounded its death knell instantaneously.
C++ 、少なくともそのスロー例外仕様にチェック例外よりも優れたものを提供しようとしました。
残念ながら、この機能は瞬時にその死を告げる鐘を鳴らしダイナミック執行に依存していました。

If I write a function void f() throw(SomeError), the body of f is still free to invoke functions that throw things other than SomeError.
Similarly, if I state that f throws no exceptions, using void f() throw(), it's still possible to invoke things that throw.
To implement the stated contract, therefore, the compiler and runtime must ensure that, should this happen, std::unexpected is called to rip the process down in response.
私は、関数ボイド F ()スロー( SomeError )を記述する場合、 F の本体はまだ SomeError 以外のものを投げる関数を呼び出すして自由です。
私は f は()ボイド F ()スローを使用して、何の例外をスローしていないと述べる場合も、それは投げ物事を起動することは可能です。
述べ契約を実装するには、そのため、コンパイラとランタイムはそれを確認する必要があり、これが起こる、の std ::予期しないが応じた処理をダウンリッピングするために呼び出される必要があります。

I'm not the only person to recognize this design was a mistake.
Indeed, throw is now deprecated.
A 私はこのデザインを認識するだけの人が間違いだったじゃありません。
確かに、 throw は廃止されます。

 detailed WG21 paper, Deprecating Exception Specifications, describes how C++ ended up here, and has this to offer in its opening statement:
詳細 WG21 紙、卑下例外仕様は、 C++ はここに終わった方法について説明し、その冒頭陳述に提供するためにこれを持っています:

> Exception specifications have proven close to worthless in practice, while adding a measurable overhead to programs.
プログラムに測定可能なオーバーヘッドを加えながら>例外仕様は、実際には無価値に近いことが証明されています。

The authors list three reasons for deprecating throw.
Two of the three reasons were a result of the dynamic choice: runtime checking (and its associated opaque failure mode) and runtime performance overheads.
The third reason, lack of composition in generic code, could have been dealt with using a proper type system (admittedly at an expense).
著者はスローを卑下するための 3 つの理由をリストします。
実行時検査(およびそれに関連する不透明な故障モード)と実行時のパフォーマンスのオーバーヘッド: 3 の理由の二つは、動的選択の結果でした。
第三の理由、汎用コードで組成物の欠如は、(確かに犠牲にして)適切な型システムを使用して対処されている可能性があります。

But the worst part is that the cure relies on yet another dynamically enforced construct - the noexcept specifier - which, in my opinion, is just as bad as the disease.
noexcept 指定子 - - 私の意見では、病気と同じくらい悪いですが、最悪の部分は、治療法はまだ別の動的施行の構築物に依存していますということです。

"Exception safety" is a commonly discussed practice in the C++ community.
This approach neatly classifies how functions are intended to behave from a caller's perspective with respect to failure, state transitions, and memory management.
A function falls into one of four kinds: no-throw means forward progress is guaranteed and no exceptions will emerge; strong safety means that state transitions happen atomically and a failure will not leave behind partially committed state or broken invariants; basic safety means that, though a function might partially commit state changes, invariants will not be broken and leaks are prevented; and finally, no safety means anything's possible.
This taxonomy is quite helpful and I encourage anyone to be intentional and rigorous about error behavior, either using this approach or something similar.
Even if you're using error codes.
The problem is, it's essentially impossible to follow these guidelines in a system using unchecked exceptions, except for leaf node data structures that call a small and easily auditable set of other functions.
Just think about it: to guarantee strong safety everywhere, you would need to consider the possibility of all function calls throwing, and safeguard the surrounding code accordingly.
That either means programming defensively, trusting another function's documented English prose (that isn't being checked by a computer), getting lucky and only calling noexcept functions, or just hoping for the best.
Thanks to RAII, the leak-freedom aspect of basic safety is easier to attain - and pretty common these days thanks to smart pointers - but even broken invariants are tricky to prevent.
The article Exception Handling: A False Sense of Security sums this up well.
"例外安全性は、"C++ コミュニティで一般的に議論の練習です。
このアプローチは、きちんと機能が障害、状態遷移、及びメモリ管理に対する発呼者の観点から動作するように意図されている方法を分類します。
関数は、 4 種類のいずれかに分類されます。ノースローフォワードプログレスが保証されていて、例外が出現しないことを意味しません。強力な安全性は、状態遷移がアトミックに起こると、障害が部分的にコミットされた状態や壊れた不変式を背後に残していないことを意味します。基本的な安全機能は、部分的に状態の変更をコミットするかもしれませんが、不変条件が破壊されず、漏れが防止されている、ことを意味します。そして最後に、何の安全性は、可能なもののことを意味します。
この分類は非常に有用であると私はどちらか、このアプローチまたは類似のものを使用して、誰もが意図的とエラー動作に関する厳格されることをおすすめします。
あなたは、エラーコードを使用している場合でも。
問題は、それが他の機能の小さなと簡単に監査可能なセットを呼び出すリーフノードデータ構造を除いて、非チェック例外を使用して、システムにこれらのガイドラインに従うことが、本質的に不可能だ、です。
ちょうどそれについて考える:あなたが投げるすべての関数呼び出しの可能性を考慮する必要があり、それに応じて周囲のコードを保護するだろう、どこでも強力な安全性を保証します。
それは幸運取得し、唯一の noexcept 関数を呼び出すか、単に最高のを期待して、(それがコンピュータによって確認されていない)別の関数の文書化された英語の散文を信頼し、守備プログラミングを意味するのいずれか。
スマートポインタのおかげで、これらの日とかなり共通 - - RAII のおかげで、基本的な安全の漏れ自由の側面は、達成しやすいですが、でも、壊れた不変量は、防止するのが難しいです。
記事の例外処理:誤った安心感がよく、これを要約しています。

For C++ , the real solution is easy to predict, and rather straightforward: for robust systems programs, don't use exceptions.
That's the approach Embedded C++ takes, in addition to numerous realtime and mission critical guidelines for C++ , including NASA's Jet Propulsion Laboratory's.
C++ on Mars sure ain't using exceptions anytime soon.
C++ の場合は、真の解決策は、予測することは容易で、かつかなり簡単です:堅牢なシステムのプログラムのために、例外を使用しないでください。
それは NASA のジェット推進研究所の含む C++ のための多数のリアルタイムおよびミッションクリティカルなガイドラインに加えて、かかる++アプローチ組み込み C です。
C++ は火星に確認してくださいいつでもすぐに例外を使用していません。

So if you can safely avoid exceptions and stick to C-like return codes in C++ , what's the beef?
あなたが安全に例外を回避し、 C++ で C-ようなリターンコードに固執することができそうだとすれば、牛肉は何ですか？

The entire C++ ecosystem uses exceptions.
To obey the above guidance, you must avoid significant parts of the language and, it turns out, significant chunks of the library ecosystem.
Want to use the Standard Template Library? Too bad, it uses exceptions.
Want to use Boost? Too bad, it uses exceptions.
Your allocator likely throws bad_alloc.
And so on.
This even causes insanity like people creating forks of existing libraries that eradicates exceptions.
The Windows kernel, for instance, has its own fork of the STL that doesn't use exceptions.
This bifurcation of the ecosystem is neither pleasant nor practical to sustain.
全体 C++ の生態系は、例外を使用しています。
上記の指針に従うためには、言語の重要な部分とライブラリの生態系の、結局のところ、かなりのチャンクを避けなければなりません。
標準テンプレートライブラリを使用してみませんか？残念、それは例外を使用しています。
ブーストを使用してみませんか？残念、それは例外を使用しています。
あなたのアロケータは、おそらく bad_alloc をスローします。
等々。
これはあっても、例外を根絶する既存のライブラリのフォークを作成する人のような狂気を引き起こします。
Windows カーネルは、例えば、例外を使用しない STL の独自のフォークを持っています。
生態系のこの分岐は、快適でも維持することが実用的でもありません。

This mess puts us in a bad spot.
Especially because many languages use unchecked exceptions.
It's clear that they are ill-suited for writing low-level, reliable systems code.
(I'm sure I will make a few C++ enemies by saying this so bluntly.) After writing code in Midori for years, it brings me tears to go back and write code that uses unchecked exceptions; even simply code reviewing is torture.
But "thankfully" we have checked exceptions from Java to learn and borrow from … Right?
この混乱は、不良箇所で私たちを置きます。
特に、多くの言語は、非チェック例外を使用しているため。
それは彼らが低レベル、信頼性の高いシステムのコードを書くために不向きであることは明らかです。
(私はそうぶっきらぼうにこのことを言って、いくつかの C++ の敵を作ると確信しています。)年間の Midori のコードを書いた後、それは私が戻って、チェック例外を使用するコードを書くために涙をもたらします。でも、単にコードの見直しは拷問です。
しかし、"ありがたいこと"私たちは右...学び、から借りて Java からチェック例外をしていますか？

## Checked Exceptions

Ah, checked exceptions.
The rag doll that nearly every Java programmer, and every person who's observed Java from an arm's length distance, likes to beat on.
Unfairly so, in my opinion, when you compare it to the unchecked exceptions mess.
ああ、例外をチェックしました。
縫いぐるみ人形ほぼすべての Java プログラマ、および腕の長さの距離から Java を観察していますすべての人は、上に倒すのが好きです。
不当ので、私の意見では、あなたが非チェック例外の混乱にそれを比較するとき。

In Java, you know mostly what a method might throw, because a method must say so:
この方法は、そのように言わなければならないので、 Java では、あなたは、メソッドがスローする可能性があり、ほとんど何を知っています:

```
void foo() throws FooException, BarException {
  ...
}
```

Now a caller knows that invoking foo could result in either FooException or BarException being thrown.
At callsites a programmer must now decide: 1) propagate thrown exceptions as-is, 2) catch and deal with them, or 3) somehow transform the type of exception being thrown (possibly even "forgetting" the type altogether).
For instance:
今、呼び出し側は FooException または BarException のいずれかがスローされることに呼び出す foo が生じる可能性がことを知っています。
callsites で、プログラマは今決定する必要があります: 1 ) 2 )キャッチ、そのままスローされた例外を伝播し、それらに対処、または 3 )何らかの形で例外の型が(おそらくは)全くタイプ"忘却"がスローされる変換します。
例えば:

```
// 1) Propagate exceptions as-is:
void bar() throws FooException, BarException {
  foo();
}

// 2) Catch and deal with them:
void bar() {
  try {
    foo();
  }
  catch (FooException e) {
    // Deal with the FooException error conditions.
  }
  catch (BarException e) {
    // Deal with the BarException error conditions.
  }
}

// 3) Transform the exception types being thrown:
void bar() throws Exception {
  foo();
}
```

This is getting much closer to something we can use.
But it fails on a few accounts:
これは、我々が使用することができるものに非常に近いなっています。
しかし、それはいくつかのアカウントに失敗します。

1. Exceptions are used to communicate unrecoverable bugs, like null dereferences, divide-by-zero, etc.
1. 例外が回復不能なバグを通信するために使用される、ヌル逆参照ように、ゼロ除算など

2. You don't actually know everything that might be thrown, thanks to our little friend RuntimeException.
Because Java uses exceptions for all error conditions - even bugs, per above - the designers realized people would go mad with all those exception specifications.
And so they introduced a kind of exception that is unchecked.
That is, a method can throw it without declaring it, and so callers can invoke it seamlessly.

 2 ::あなたが実際に、私たちの小さな友人の RuntimeException のおかげでスローされる可能性があるすべてを知っていません。
でもバグ、上記のあたり - - Java はすべてのエラー状態の例外を使用しているため、設計者は、人々がこれらすべての例外仕様に怒って行くだろう実現しました。
だから、彼らはオフになっている例外の種類を導入しました。
つまり、メソッドを宣言せずにそれを投げることができ、従って発信者がシームレスにそれを呼び出すことができますです。

3. Although signatures declare exception types, there is no indication at callsites what calls might throw.
3. 署名は例外型を宣言したが、投げるかもしれない呼ん callsites での兆候はありません。

4. People hate them.
4. 人々は彼らを憎みます。

That last one is interesting, and I shall return to it later when describing the approach Midori took.
In summary, peoples' distaste for checked exceptions in Java is largely derived from, or at least significantly reinforced by, the other three bullets above.
The resulting model seems to be the worst of both worlds.
It doesn't help you to write bulletproof code and it's hard to use.
You end up writing down a lot of gibberish in your code for little perceived benefit.
And versioning your interfaces is a pain in the ass.
As we'll see later, we can do better.
つまり、最後のものは面白いです、と Midori が取ったアプローチを記述するとき、私は後でそれに返還しなければなりません。
要約すると、 Java でチェック例外のための人々の嫌悪感は、主に由来する、または少なくとも大幅に他の三つの弾丸上記、によって強化します。
結果として得られるモデルは、両方の世界の最悪のようです。
それはあなたが防弾コードを記述する助けにはならない、それが使用するのは難しいです。
あなたは少し知覚利益のためにあなたのコード内でちんぷんかんぷんの多くを書き留めてしまいます。
そして、あなたのインターフェイスを、バージョン管理がお尻の痛みです。
私たちが後でわかるように、私たちはより良い行うことができます。

That versioning point is worth a ponder.
If you stick to a single kind of throw, then the versioning problem is no worse than error codes.
Either a function fails or it doesn't.
It's true that if you design version 1 of your API to have no failure mode, and then want to add failures in version 2, you're screwed.
As you should be, in my opinion.
An API's failure mode is a critical part of its design and contract with callers.
Just as you wouldn't change the return type of an API silently without callers needing to know, you shouldn't change its failure mode in a semantically meaningful way.
More on this controversial point later on.
つまり、バージョン管理のポイントは熟考の価値があります。
あなたはスローの一種類に固執する場合は、バージョン管理の問題は、エラーコードよりも悪いことではありません。
関数が失敗するか、しませんか。
それはあなたが何の故障モードを持っていないためにあなたの API のバージョン 1 を設計してから、バージョン 2 に障害を追加したい場合は、あなたがねじ込まれていることは事実です。
あなたは私の意見では、あるべきであるように。
API の故障モードは、その設計と発信者との契約の重要な部分です。
あなたが知る必要が発信者なしで静かに API の戻り値の型を変更しないのと同じように、あなたは、意味的に意味のある方法で、その故障モードを変更しないでください。
後でこの論争のポイントの詳細。

CLU has an interesting approach, as described in this crooked and wobbly scan of a 1979 paper by Barbara Liskov, Exception Handling in CLU.
Notice that they focus a lot on "linguistics"; in other words, they wanted a language that people would love.
The need to check and repropagate all errors at callsites felt a lot more like return values, yet the programming model had that richer and slightly declarative feel of what we now know as exceptions.
And most importantly, signals (their name for throw) were checked.
There were also convenient ways to terminate the program should an unexpected signal occur.
バーバラリスコフ、 CLU での例外処理によって、 1979 紙のこの曲がったとグラグラスキャンで説明したように CLU は、興味深いアプローチがあります。
彼らは"言語学"に多くを焦点を当てていることに注意してください。言い換えれば、彼らは人々が大好きだという言葉を望んでいました。
callsites ですべてのエラーをチェックし、伝播し直す必要性は、より多くの返り値のように多くのことを感じ、まだプログラミングモデルは、我々は今、例外として知っているもののことより豊かでやや宣言型の感触を持っていました。
そして、最も重要なのは、信号が(スローのための自分の名前)を確認しました。
予期しないシグナルが発生したプログラムを終了するための便利な方法もありました。

## Universal Problems with Exceptions

Most exception systems get a few major things wrong, regardless of whether they are checked or unchecked.
ほとんどの例外システムは関係なく、彼らがオンまたはオフされているかどうかの、いくつかの主要な物事が間違って取得します。

First, throwing an exception is usually ridiculously expensive.
This is almost always due to the gathering of a stack trace.
In managed systems, gathering a stack trace also requires groveling metadata, to create strings of function symbol names.
If the error is caught and handled, however, you don't even need that information at runtime! Diagnostics are better implemented in the logging and diagnostics infrastructure, not the exception system itself.
The concerns are orthogonal.
Although, to really nail the diagnostics requirement above, something needs to be able to recover stack traces; never underestimate the power of printf debugging and how important stack traces are to it.
まず、例外をスローすると、通常は途方もなく高価です。
これはほとんどの場合、スタックトレースの収集に起因しています。
管理対象システムでは、スタックトレースを収集することも、関数のシンボル名の文字列を作成するには、卑俗なメタデータを必要とします。
エラーがキャッチされ処理されている場合は、しかし、あなたも、実行時にその情報を必要としません！診断は、より良いロギングおよび診断インフラストラクチャではなく、例外システム自体に実装されています。
懸念は直交しています。
実際に上記の診断要件を爪に、けれども、何かがスタックトレースを回復できるようにする必要があります。 printf 関数のデバッグとどのように重要なスタックトレースがそれにしているの力を過小評価することはありません。

Next, exceptions can significantly impair code quality.
I touched on this topic in my last post, and there are good papers on the topic in the context of C++ .
Not having static type system information makes it hard to model control flow in the compiler, which leads to overly conservative optimizers.
次に、例外が大幅にコードの品質を損なうことができます。
私は私の最後のポストでこの話題に触れ、および C++ の文脈におけるトピックに関する良い論文があります。
静的型システムの情報がないと、それは難しい過度に保守的オプティマイザにつながるコンパイラで制御フローをモデル化することができます。

Another thing most exception systems get wrong is encouraging too coarse a granularity of handling errors.
Proponents of return codes love that error handling is localized to a specific function call.
(I do too!) In exception handling systems, it's all too easy to slap a coarse-grained try/catch block around some huge hunk of code, without carefully reacting to individual failures.
That produces brittle code that's almost certainly wrong; if not today, then after the inevitable refactoring that will occur down the road.
A lot of this has to do with having the right syntaxes.
ほとんどの例外システムは誤解もう一つは、エラー処理の粒度を粗くあまりにも奨励しています。
リターンコードの支持者は、エラー処理は、特定の関数呼び出しに局在することが大好きです。
(私も！)例外処理システムでは、慎重に、個々の障害に反応することなく、コードのいくつかの巨大な塊の周りの粗粒 try / catch ブロックを平手打ちするすべてあまりにも簡単です。
それはほぼ確実に間違って脆いコードを生成します。そうでない場合は、今日、その後、道の下に発生する必然的なリファクタリングの後。
これの多くは、右の構文を持つに関係しています。

Finally, control flow for throws is usually invisible.
Even with Java, where you annotate method signatures, it's not possible to audit a body of code and see precisely where exceptions come from.
Silent control flow is just as bad as goto, or setjmp/longjmp, and makes writing reliable code very difficult.
最後に、スローのための制御フローは、通常は見えません。
でもあなたは、メソッドのシグネチャに注釈を付けるの Java 、で、それはコードの本体を監査し、例外がどこから来るのか正確に確認することはできません。
サイレント制御フローは goto や setjmp 関数/ longjmp のと同じくらい悪いです、と非常に困難な信頼性の高いコードを書くことができます。

## Where Are We?

Before moving on, let's recap where we are:
上に移動する前に、私たちがどこにあるのは、おさらいしてみましょう:

:TODO table

Wouldn't it be great if we could take all of The Goods and leave out The Bads and The Uglies?
私たちは製品のすべてを取るとバッズと難しいものを残すことができればそれは素晴らしいことではないでしょうか？

This alone would be a great step forward.
But it's insufficient.
This leads me to our first big "ah-hah" moment that shaped everything to come.
For a significant class of error, none of these approaches are appropriate!
これだけ大きな前進となります。
しかし、それは不十分です。
これは来るためにすべてを形作って私たちの最初の大きな"ああ、ほら"瞬間に私をリードしています。
エラーの重要なクラスでは、これらのアプローチのいずれも適切ではありません！

# Bugs Aren't Recoverable Errors!

A critical distinction we made early on is the difference between recoverable errors and bugs:
我々は早い段階で作られた重要な区別は、回復可能なエラーやバグの差です。

- A recoverable error is usually the result of progammatic data validation.
Some code has examined the state of the world and deemed the situation unacceptable for progress.
Maybe it's some markup text being parsed, user input from a website, or a transient network connection failure.
In these cases, programs are expected to recover.
The developer who wrote this code must think about what to do in the event of failure because it will happen in well-constructed programs no matter what you do.
The response might be to communicate the situation to an end-user, retry, or abandon the operation entirely, however it is a predictable and, frequently, planned situation, despite being called an "error."
- 回復可能なエラーは通常、プログラミングデータ検証の結果です。
いくつかのコードは、世界の状態を調べ、進歩のために許容できない状況であるとみなされています。
多分それは解析され、いくつかのマークアップテキスト、ウェブサイト、または一時的なネットワーク接続障害からユーザの入力です。
これらのケースでは、プログラムは、回復することが期待されます。
それはあなたが何でうまく構成されたプログラムを起こりませんので、このコードを書いた開発者は、障害が発生した場合にどうするかを考える必要があります。
応答は、エンドユーザに状況を伝え、再試行、または完全に操作を中断するかもしれない、しかしそれが呼び出されているにもかかわらず、予測可能で、頻繁に、計画された状況である"エラーが発生しました。"

- A bug is a kind of error the programmer didn't expect.
Inputs weren't validated correctly, logic was written wrong, or any host of problems have arisen.
Such problems often aren't even detected promptly; it takes a while until "secondary effects" are observed indirectly, at which point significant damage to the program's state might have occurred.
Because the developer didn't expect this to happen, all bets are off.
All data structures reachable by this code are now suspect.
And because these problems aren't necessarily detected promptly, in fact, a whole lot more is suspect.
Depending on the isolation guarantees of your language, perhaps the entire process is tainted.
- バグは、プログラマが期待していなかったエラーの一種です。
入力が正しく検証されなかったため、ロジックが間違って書かれた、または問題の任意のホストが生じています。
このような問題は、多くの場合であっても速やかに検出されません。 "二次的効果は"間接的に観察されるまで、それは、プログラムの状態に重大な損傷が発生した可能性があり、その時点で、時間がかかります。
開発者はこれが起こることを期待していなかったので、全てのベットはオフになっています。
このコードによって到達可能なすべてのデータ構造は、現在に思われます。
これらの問題は必ずしも速やかに検出されないためと、実際には、より全体の多くは疑わしいです。
あなたの言語の分離の保証に応じて、おそらくプロセス全体が汚染されています。

This distinction is paramount.
Surprisingly, most systems don't make one, at least not in a principled way! As we saw above, Java, C# , and dynamic languages just use exceptions for everything; and C and Go use return codes.
C++ uses a mixture depending on the audience, but the usual story is a project picks a single one and uses it everywhere.
You usually don't hear of languages suggesting two different techniques for error handling, however.
この区別は非常に重要です。
驚くべきことに、ほとんどのシステムは、少なくともではない原則に基づいた方法で、ものを作ることはありません！我々は上で見たように、 Java や C# の、および動的言語は、ちょうどすべての例外を使用します。 C および Go がリターンコードを使用します。
C++ は、観客に応じて混合物を使用していますが、通常の物語は、プロジェクトが単一のものを選び、どこでもそれを使用しています。
あなたは通常、しかし、エラー処理のための 2 つの異なる技術を示唆している言語で聞くことができません。

Given that bugs are inherently not recoverable, we made no attempt to try.
All bugs detected at runtime caused something called abandonment, which was Midori's term for something otherwise known as "fail-fast".
バグが本質的に回復不可能であることを考えると、我々はしようとする試みがなされていません。
実行時に検出されたすべてのバグは、そうでなければ、"フェイルファスト"として知られている何かのための Midori の任期だっ中断と呼ばれるものを、引き起こしました。

Each of the above systems offers abandonment-like mechanisms.
 C# has Environment.FailFast; C++ has std::terminate; Go has panic; Rust has panic!; and so on.
Each rips down the surrounding context abruptly and promptly.
The scope of this context depends on the system - for example, C# and C++ terminate the process, Go the current Goroutine, and Rust the current thread, optionally with a panic handler attached to salvage the process.
上記システムの各々は、中断のようなメカニズムを提供しています。
 C# の環境を持っています。フェイルファスト; C++ は、スタンダード::終了を持っています。 Go がパニックを持っています。 Rust がパニックを持っています！;等々。
それぞれが突然かつ迅速に周囲の状況を下にリッピング。
この文脈の範囲は、システムによって異なります - 例えば、 C# と C++ のプロセスを終了し、現在のゴルーチン、及び Rust に現在のスレッドを移動し、必要に応じてプロセスをサルベージするために取り付けられたパニックハンドラで。

Although we did use abandonment in a more disciplined and ubiquitous way than is common, we certainly weren't the first to recognize this pattern.
This Haskell essay, articulates this distinction quite well:
私たちが一般的であるよりも多くの規律とユビキタスな方法で中断を使いましたが、我々は確かにこのパターンを認識することが最初ではなかったです。
この Haskell のエッセイは、非常によくこの区別を明確に表現します:

> I was involved in the development of a library that was written in C++ .
One of the developers told me that the developers are divided into the ones who like exceptions and the other ones who prefer return codes.
As it seem to me, the friends of return codes won.
However, I got the impression that they debated the wrong point: Exceptions and return codes are equally expressive, they should however not be used to describe errors.
Actually the return codes contained definitions like ARRAY_INDEX_OUT_OF_RANGE.
But I wondered: How shall my function react, when it gets this return code from a subroutine? Shall it send a mail to its programmer? It could return this code to its caller in turn, but it will also not know how to cope with it.
Even worse, since I cannot make assumptions about the implementation of a function, I have to expect an ARRAY_INDEX_OUT_OF_RANGE from every subroutine.
My conclusion is that ARRAY_INDEX_OUT_OF_RANGE is a (programming) error.
It cannot be handled or fixed at runtime, it can only be fixed by its developer.
Thus there should be no according return code, but instead there should be asserts.
>私は C++ で書かれたライブラリーの開発に携わっていました。
開発者の一人は、開発者は例外とリターンコードを好む他のものを好きなものに分けられていることを教えてくれました。
それは私には見えるように、戻りコードの友達が獲得しました。
しかし、私は彼らが間違った点を議論していることを印象を受けました:例外と戻りコードも同様に、表現されている、彼らは、しかし、エラーを記述するために使用すべきではありません。
実際にリターンコードは ARRAY_INDEX_OUT_OF_RANGE のような定義が含まれています。
しかし、私は疑問に思いました:どのように私の関数は、サブルーチンから、このリターンコードを取得したときに、反応しなければなりませんか？それは、そのプログラマにメールを送信しなければなりませんか？これは、順番に呼び出し元にこのコードを返すことができ、それはまた、それに対処する方法を知ることができません。
私は関数の実装についての仮定をすることはできませんので、さらに悪いことに、私はすべてのサブルーチンから ARRAY_INDEX_OUT_OF_RANGE を期待する必要があります。
私の結論は ARRAY_INDEX_OUT_OF_RANGE は(プログラミング)エラーであるということです。
これは、実行時に処理または固定することができない、それだけで、その開発者によって固定することができます。
このように全く応じたリターンコードがあってはならないが、代わりにアサートがあるはずです。

Abandoning fine grained mutable shared memory scopes is suspect - like Goroutines or threads or whatever - unless your system somehow makes guarantees about the scope of the potential damage done.
However, it's great that these mechanisms are there for us to use! It means using an abandonment discipline in these languages is indeed possible.
きめの細かい変更可能な共有メモリースコープを中断することは疑わしいです - ゴルーチンやスレッドまたは何のように - あなたのシステムが何らかの形で行わ潜在的な損傷の範囲について保証するものでない限り。
しかし、それは私たちが使用するためにこれらのメカニズムがあることが素晴らしいです！それは以下の言語で中断規律を使用することが実際に可能であることを意味します。

There are architectural elements necessary for this approach to succeed at scale, however.
I'm sure you're thinking "If I tossed the entire process each time I had a null dereference in my C# program, I'd have some pretty pissed off customers"; and, similarly, "That wouldn't be reliable at all!" Reliability, it turns out, might not be what you think.
しかし、規模で成功するには、このアプローチのために必要な建築要素があります。
私は "私は全体のプロセスに私は私の C# のプログラムでヌル間接参照を持っていたそれぞれの時間を投げた場合、私はいくつかの非常に顧客を怒らせているだろう"あなたが考えていると確信しています。そして、同様に、"それは全く信頼できないだろう！"信頼性は、結局のところ、あなたが何を考えではないかもしれません。

# Reliability, Fault-Tolerance, and Isolation

Before we get any further, we need to state a central belief: Shi Failure Happens.
市の障害が発生する:私たちはそれ以上を取得する前に、我々は中央の信念を述べる必要があります。

## To Build a Reliable System

Common wisdom is that you build a reliable system by systematically guaranteeing that failure can never happen.
Intuitively, that makes a lot of sense.
There's one problem: in the limit, it's impossible.
If you can spend millions of dollars on this property alone - like many mission critical, realtime systems do - then you can make a significant dent.
And perhaps use a language like SPARK (a set of contract-based extensions to Ada) to formally prove the correctness of each line written.
However, experience shows that even this approach is not foolproof.
共通の知恵は、あなたが体系的に障害が起こることはありませんことを保証することにより、信頼性の高いシステムを構築することです。
直感的に、それは多くの意味になります。
一つの問題があります:限界で、それは不可能です。
あなただけでは、このプロパティに数百万ドルを費やすことができれば - 多くのミッションクリティカルなように、リアルタイムシステムはない - あなたはかなりの凹みを作ることができます。
そして、おそらく正式に書かれた各行の正しさを証明するために SPARK ような言語(エイダへの契約ベースの拡張機能のセット)を使用します。
しかし、経験があっても、このアプローチはフールプルーフではないことを示しています。

Rather than fighting this fact of life, we embraced it.
Obviously you try to eliminate failures where possible.
The error model must make them transparent and easy to deal with.
But more importantly, you architect your system so that the whole remains functional even when individual pieces fail, and then teach your system to recover those failing pieces gracefully.
This is well known in distributed systems.
So why is it novel?
むしろ人生のこの事実を戦うよりも、我々はそれを受け入れました。
明らかに、あなたはどこに可能性がある障害を排除しようとします。
誤差モデルは、彼らが透明で対処しやすいようにする必要があります。
しかし、もっと重要なのは、あなたの建築家、システム全体が個々の部分が失敗した場合でも機能し続け、その後、優雅にそれらの失敗の作品を回復するためにあなたのシステムを教えるようにします。
これは、分散システムでよく知られています。
では、なぜそれが小説のですか？

At the center of it all, an operating system is just a distributed network of cooperating processes, much like a distributed cluster of microservices or the Internet itself.
The main differences include things like latency; what levels of trust you can establish and how easily; and various assumptions about locations, identity, etc.
But failure in highly asynchronous, distributed, and I/O intensive systems is just bound to happen.
My impression is that, largely because of the continued success of monolithic kernels, the world at large hasn't yet made the leap to "operating system as a distributed system" insight.
Once you do, however, a lot of design principles become apparent.
それをすべての中心には、オペレーティングシステムは、多くの microservices の分散型クラスタまたはインターネット自体のように、協調動作するプロセスのちょうど分散ネットワークです。
主な違いは、待ち時間のようなものが含まれます。信頼のどんなレベルあなたが確立し、どのように簡単にすることができます。等の位置、アイデンティティ、約さまざまな仮定
しかし、非常に非同期で失敗、分散型、および I / O 集中型のシステムはちょうど起こるにバインドされています。
私の印象は、主な理由モノリシックカーネルの継続的な成功のため、広く世界はまだ洞察力 "分散システムなどのオペレーティングシステム"への飛躍を行っていない、ということです。
あなたは一度、しかし、設計原理の多くが明らかになります。

As with most distributed systems, our architecture assumed process failure was inevitable.
We went to great length to defend against cascading failures, journal regularly, and to enable restartability of programs and services.
ほとんどの分散システムと同じように、私たちのアーキテクチャを想定プロセスの障害は避けられませんでした。
私たちは、定期的に連鎖的に障害が発生し、ジャーナルから身を守るために、プログラムやサービスの再始動を可能にするために偉大な長さに行ってきました。

You build things differently when you go in assuming this.
あなたはこれを仮定しに行くとき、あなたは違ったものを構築します。

In particular, isolation is critical.
Midori's process model encouraged lightweight fine-grained isolation.
As a result, programs and what would ordinarily be "threads" in modern operating systems were independent isolated entities.
Safeguarding against failure of one such connection is far easier than when sharing mutable state in an address space.
具体的には、アイソレーションが重要です。
Midori のプロセスモデルは、軽量きめ細かい分離を奨励しました。
その結果、プログラムと何が通常現代のオペレーティングシステムで"スレッド"は独立した孤立したエンティティであったであろう。
そのような接続の障害に対して保護するアドレス空間に変更可能な状態を共有する場合よりもはるかに簡単です。

Isolation also encourages simplicity.
Butler Lampson's classic Hints on Computer System Design explores this topic.
And I always loved this quote from Hoare:
分離はまた、シンプルさを奨励しています。
コンピュータシステムの設計上のバトラーランプソンの古典的なヒントがこのトピックを探ります。
そして、私はいつもホーアからこの引用を愛して:

> The unavoidable price of reliability is simplicity.
(C. Hoare).
>信頼性の不可避の価格は、簡単です。
( C. ホーア)。


By keeping programs broken into smaller pieces, each of which can fail or succeed on its own, the state machines within them stay simpler.
As a result, recovering from failure is easier.
In our language, the points of possible failure were explicit, further helping to keep those internal state machines correct, and pointing out those connections with the messier outside world.
In this world, the price of individual failure is not nearly as dire.
I can't over-emphasize this point.
None of the language features I describe later would have worked so well without this architectural foundation of cheap and ever-present isolation.
失敗したり、独自に成功することができ、それぞれがより小さな部分に分割するプログラムを、維持することによって、それらの中のステートマシンは、単純に滞在します。
その結果、障害から回復することは容易です。
私たちの言語では、失敗する可能性のポイントは、さらに正しいそれらの内部ステートマシンを維持するのを助ける、と厄介外の世界とそれらの接続を指摘し、明示的でした。
この世界では、個々の障害の価格はほぼ同じくらい悲惨ではありません。
私はこの点をオーバー強調することはできません。
私は後で記述言語機能のいずれも、安価で常に存在するアイソレーションのこのアーキテクチャ基盤なしでとてもよく働いていないでしょう。

Erlang has been very successful at building this property into the language in a fundamental way.
It, like Midori, leverages lightweight processes connected by message passing, and encourages fault-tolerant architectures.
A common pattern is the "supervisor," where some processes are responsible for watching and, in the event of failure, restarting other processes.
This article does a terrific job articulating this philosophy - "let it crash" - and recommended techniques for architecting reliable Erlang programs in practice.
Erlang のは、基本的な方法で言語にこのプロパティを構築するのに非常に成功しています。
それは、 Midori のように、メッセージパッシングによって接続された軽量のプロセスを活用し、フォールトトレラントなアーキテクチャを奨励しています。
一般的なパターンは、いくつかのプロセスが見て、障害が発生した場合に、他のプロセスを再起動する責任がある"スーパーバイザー"です。
"それがクラッシュしましょう " - - この資料では、この理念を明確素晴らしい仕事をしていませんし、実際には信頼性の高い Erlang のプログラムを設計するための技術をお勧めします。

The key thing, then, is not preventing failure per se, but rather knowing how and when to deal with it.
重要なのは、それから、それ自体の故障を防止されるのではなく、どのように知り、ときにそれに対処します。

Once you've established this architecture, you beat the hell out of it to make sure it works.
For us, this meant week-long stress runs, where processes would come and go, some due to failures, to ensure the system as a whole kept making good forward progress.
This reminds me of systems like Netflix's Chaos Monkey which just randomly kills entire machines in your cluster to ensure the service as a whole stays healthy.
あなたはこのアーキテクチャを確立したら、あなたはそれが動作することを確認するためにそれの地獄を破りました。
全体的に良好な前方に進展して保たれるよう私たちにとって、この意味週間のストレスが実行されると、プロセスは、システムを確実にするために、障害のいくつかの原因で、行ったり来たりする場所。
これは単にランダムに全体が健康なままで、サービスを確実にするために、クラスタ内の全体のマシンを殺すの Netflix のカオス猿のようなシステムのことを思い出します。

I expect more of the world to adopt this philosophy as the shift to more distributed computing happens.
In a cluster of microservices, for example, the failure of a single container is often handled seamlessly by the enclosing cluster management software (Kubernetes, Amazon EC2 Container Service, Docker Swarm, etc).
As a result, what I describe in this post is possibly helpful for writing more reliable Java, Node.js/JavaScript, Python, and even Ruby services.
The unfortunate news is you're likely going to be fighting your languages to get there.
A lot of code in your process is going to work real damn hard to keep limping along when something goes awry.
私はより多くの分散コンピューティングへのシフトが起こるようにこの哲学を採用する世界の多くを期待しています。
microservices のクラスタでは、例えば、単一の容器の失敗は、多くの場合、囲みクラスタ管理ソフトウェア( Kubernetes 、 Amazon EC2 のコンテナサービス、ドッカースウォーム、など)によってシームレスに処理されます。
その結果、私はこの記事で説明することは、より信頼性の Java 、 Node.js の/ JavaScript や Python の、さらには Ruby のサービスを記述するための可能性が便利です。
残念なニュースは、おそらくそこに得るためにあなたの言語を戦うことになるだろうされています。
あなたのプロセス内のコードの多くは、何かがゆがんで行くときに沿って足を引きずっ維持するために、実際のいまいましい懸命に仕事しようとしています。

## Abandonment
##中断

Even when processes are cheap and isolated and easy to recreate, it's still reasonable to think that abandoning an entire process in the face of a bug is an overreaction.
Let me try to convince you otherwise.
プロセスが安価で孤立して再作成するのが容易である場合でも、それはバグの顔にプロセス全体を中断することは過剰反応であると考えるのはまだ合理的です。
私はそうでなければあなたを説得してみましょう。

Proceeding in the face of a bug is dangerous when you're trying to build a robust system.
If a programmer didn't expect a given situation that's arisen, who knows whether the code will do the right thing anymore.
Critical data structures may have been left behind in an incorrect state.
As an extreme (and possibly slightly silly) example, a routine that is meant to round your numbers down for banking purposes might start rounding them up.
あなたは堅牢なシステムを構築しようとしているときにバグの顔に進むと危険です。
プログラマはコードがもはや正しいことを行うかどうかを知って発生しています与えられた状況を、期待していなかった場合。
重要なデータ構造が正しくない状態で残されている可能性があります。
極端な(そしておそらく少し愚かな)例として、銀行の目的のためにダウンしてあなたの数字を丸めることを意味しているルーチンは、それらを切り上げ開始する可能性があります。

And you might be tempted to whittle down the granularity of abandonment to something smaller than a process.
But that's tricky.
To take an example, imagine a thread in your process encounters a bug, and fails.
This bug might have been triggered by some state stored in a static variable.
Even though some other thread might appear to have been unaffected by the conditions leading to failure, you cannot make this conclusion.
Unless some property of your system - isolation in your language, isolation of the object root-sets exposed to independent threads, or something else - it's safest to assume that anything other than tossing the entire address space out the window is risky and unreliable.
そして、あなたはプロセスよりも小さいものに中断の粒度ダウン削るに誘惑される可能性があります。
しかし、それは難しいです。
例を取るために、あなたのプロセスのスレッドがバグに遭遇し、失敗を想像してみてください。
このバグは、静的変数に格納されているいくつかの状態によってトリガされている場合があります。
いくつかの他のスレッドが失敗につながる条件によって影響を受けていないされているように見える場合でも、あなたはこの結論を出すことはできません。
お使いのシステムのいくつかのプロパティがない限り - あなたの言語での分離、独立したスレッドにさらされたオブジェクトのルートセットの単離、または何か他のもの - それは窓の外にアドレス空間全体を投げ以外のものは危険で信頼性がないと仮定するのが最も安全です。

Thanks to the lightweight nature of Midori processes, abandoning a process was more like abandoning a single thread in a classical system than a whole process.
But our isolation model let us do this reliably.
Midori プロセスの軽量な性質のおかげで、プロセスを中断することは、より全体のプロセスよりも、古典的なシステム内の単一のスレッドを中断するようなものでした。
しかし、私たちの分離モデルは、私たちは確実にこれを実行しましょう。

I'll admit the scoping topic is a slippery slope.
Maybe all the data in the world has become corrupt, so how do you know that tossing the process is even enough?! There is an important distinction here.
Process state is transient by design.
In a well designed system it can be thrown away and recreated on a whim.
It's true that a bug can corrupt persistent state, but then you have a bigger problem on your hands - a problem that must be dealt with differently.
私はスコープのトピックが滑りやすい斜面で認めますよ。
たぶん、世界のすべてのデータが破壊されているので、どのように処理を投げすることはあっても十分であることを知っていますか？ここで重要な違いがあります。
プロセスの状態は、設計によって一過性です。
うまく設計されたシステムでは、捨てすることができ、気まぐれで再作成します。
異なる処理されなければならない問題 - それはバグが破損永続的な状態が、その後、あなたはあなたの手に大きな問題を持つことができるというのは本当です。

For some background, we can look to fault-tolerant systems design.
Abandonment (fail-fast) is already a common technique in that realm, and we can apply much of what we know about these systems to ordinary programs and processes.
Perhaps the most important technique is regularly journaling and checkpointing precious persistent state.
Jim Gray's 1985 paper, Why Do Computers Stop and What Can Be Done About It?, describes this concept nicely.
As programs continue moving to the cloud, and become aggressively decomposed into smaller independent services, this clear separation of transient and persistent state is even more important.
As a result of these shifts in how software is written, abandonment is far more achievable in modern architectures than it once was.
Indeed, abandonment can help you avoid data corruption, because bugs detected before the next checkpoint prevent bad state from ever escaping.
いくつかの背景については、我々は、フォールトトレラントシステム設計に見ることができます。
中断は、(フェイルファスト)既にそのレルムで一般的な技術である、と私たちは、通常のプログラムやプロセスにこれらのシステムについて知っていることの多くを適用することができます。
おそらく最も重要な技術は、定期的にジャーナリングと貴重な永続的な状態をチェックポイントされています。
Jim Gray 氏の 1985 紙、なぜないコンピュータを停止し、どのような素敵なこの概念を説明する？それについて行うことができます。
プログラムはクラウドに移動し続け、積極的に小さい独立したサービスに分解するにつれ、過渡的かつ持続的な状態のこの明確な分離がさらに重要です。
ソフトウェアが書かれている方法でこれらのシフトの結果として、中断は、それがかつてあったより近代的なアーキテクチャではるかに達成可能です。
実際、中断は、次のチェックポイントの前に検出されたバグが今まで逃げるの悪い状態を防ぐため、あなたは、データの破損を避けるのを助けることができます。

Bugs in Midori's kernel were handled differently.
A bug in the microkernel, for instance, is an entirely different beast than a bug in a user-mode process.
The scope of possible damage was greater, and the safest response was to abandon an entire "domain" (address space).
Thankfully, most of what you'd think of being classic "kernel" functionality - the scheduler, memory manager, filesystem, networking stack, and even device drivers - was run instead in isolated processes in user-mode where failures could be contained in the usual ways described above.
Midori のカーネルのバグは別の方法で処理しました。
マイクロカーネルのバグは、例えば、ユーザーモードプロセスのバグとはまったく異なる獣です。
損傷の範囲は大きかった、と最も安全な応答は、全体の"ドメイン"(アドレス空間)を中断することでした。
ありがたいことに、あなたは古典的な"カーネル"の機能であることを考えるだろう何の最も - スケジューラ、メモリマネージャ、ファイルシステム、ネットワークスタック、さらにはデバイスドライバが - 障害がに含まれていることができ、ユーザーモードでの孤立したプロセスで代わりに実行されました通常の方法は、上述しました。

# Bugs: Abandonment, Assertions, and Contracts
＃バグ:中断、アサーション、および契約

A number of kinds of bugs in Midori might trigger abandonment:
Midori のバグの種類の数は中断を誘発する可能性があります:

- An incorrect cast.
- An attempt to dereference a null pointer.
- An attempt to access an array outside of its bounds.
- Divide-by-zero.
- An unintended mathematical over/underflow.
- Out-of-memory.
- Stack overflow.
- Explicit abandonment.
- Contract failures.
- Assertion failures.
- 不正なキャスト。
- NULL ポインタを逆参照しよう。
- その境界の外側の配列にアクセスしようとします。
- ゼロ除算。
- オーバー/アンダーフロー意図しない数学的。
- メモリ不足。
- スタックオーバーフロー。
- 明示的な中断。
- 契約の失敗。
- アサーションの失敗。

Our fundamental belief was that each is a condition the program cannot recover from.
Let's discuss each one.
私たちの基本的な信念は、各プログラムはから回復することができない状態であるということでした。
それでは、それぞれを説明しましょう。

## Plain Old Bugs

Some of these situations are unquestionably indicative of a program bug.
これらの状況のいくつかは、紛れもなく、プログラムのバグを示しています。

An incorrect cast, attempt to dereference null, array out-of-bounds access, or divide-by-zero are clearly problems with the program's logic, in that it attempted an undeniably illegal operation.
As we will see later, there are ways out (e.g., perhaps you want NaN-style propagation for DbZ).
But by default we assume it's a bug.
それは紛れもなく不正な操作をしようとしたことで不正なキャスト、逆参照 null にしようと、配列の境界外アクセス、またはゼロ除算は、明らかに、プログラムのロジックに問題があります。
我々は後で見るように、(おそらくあなたが DBZ のための NaN スタイルの伝播をしたい、など)の方法そこにいます。
しかし、デフォルトでは、我々はそれがバグだと仮定します。

Most programmers were willing to accept this without question.
And dealing with them as bugs this way brought abandonment to the inner development loop where bugs during development could be found and fixed fast.
Abandonment really did help to make people more productive at writing code.
This was a surprise to me at first, but it makes sense.
ほとんどのプログラマは質問せずにこれを受け入れて喜んでいました。
やバグ、それらに対処するこの方法は、開発中にバグが発見され、高速に固定することができ、内側開発ループへの中断をもたらしました。
中断は本当に書き込みコードで、人々がより生産的にするために役立ちました。
これは、最初に私には驚きだったが、それは理にかなっています。

Some of these situations, on the other hand, are subjective.
We had to make a decision about the default behavior, often with controversy, and sometimes offer programmatic control.
これらの状況のいくつかは、他方で、主観的です。
私たちはしばしば論争で、デフォルトの動作についての決定をしなければならなかった、そして時にはプログラム制御を提供します。


## Arithmetic Over/Underflow

Saying an unintended arithmetic over/underflow represents a bug is certainly a contentious stance.
In an unsafe system, however, such things frequently lead to security vulnerabilities.
I encourage you to review the National Vulnerability Database to see the sheer number of these.
オーバー/アンダーフロー意図しない演算がバグを表し言ってすることは確かに論争的な姿勢です。
安全でないシステムでは、しかし、そのようなことは頻繁にセキュリティ上の脆弱性につながります。
私は、これらの膨大な数を確認するために国家の脆弱性データベースを確認することをお勧めします。

In fact, the Windows TrueType Font parser, which we ported to Midori (with gains in performance), has suffered over a dozen of them in the past few years alone.
(Parsers tend to be farms for security holes like this.)
実際には、我々は(パフォーマンスの向上に) Midori への移植の Windows の TrueType フォントパーサーは、単独で、過去数年間でそれらのダースの上に苦しんでいます。
(パーサはこのようなセキュリティホールのための農場になる傾向があります。)

This has given rise to packages like SafeInt, which essentially moves you away from your native language's arithmetic operations, in favor of checked library ones.
これは本質的にチェックし、ライブラリを好んで、離れてあなたの母国語の算術演算からあなたを移動 SafeInt 、のようなパッケージに上昇を与えています。

Most of these exploits are of course also coupled with an access to unsafe memory.
You could reasonably argue therefore that overflows are innocuous in a safe language and therefore should be permitted.
It's pretty clear, however, based on the security experience, that a program often does the wrong thing in the face of an unintended over/underflow.
Simply put, developers frequently overlook the possibility, and the program proceeds to do unplanned things.
That's the definition of a bug which is precisely what abandonment is meant to catch.
The final nail in the coffin on this one is that philisophically, when there was any question about correctness, we tended to err on the side of explicit intent.
これらの攻撃のほとんどはもちろん、安全でないメモリへのアクセスに連結されています。
あなたは合理的にオーバーフローが安全な言語で無害であるため、許可すべきことは主張することができます。
これは、プログラムは、多くの場合、意図しないオーバー/アンダーフローの面で間違ったことをしていることを、セキュリティの経験に基づいて、しかし、かなり明確です。
簡単に言えば、開発者は頻繁に可能性を見落とすと、プログラムが計画外の物事を行うに進みます。
それがキャッチするために何を意味するか中断正確であるバグの定義です。
この 1 上の棺で最後の釘は、正確さについての質問があったとき philisophically 、我々は明確な意図の側に誤る傾向があったということです。

Hence, all unannotated over/underflows were considered bugs and led to abandonment.
This was similar to compiling C# with the /checked switch, except that our compiler aggressively optimized redundant checks away.
(Since few people ever think to throw this switch in C# , the code-generators don't do nearly as aggressive a job in removing the inserted checks.) Thanks to this language and compiler co-development, the result was far better than what most C++ compilers will produce in the face of SafeInt arithmetic.
Also as with C# , the unchecked scoping construct could be used where over/underflow was intended.
したがって、すべての注釈なしのオーバー/アンダーフローがバグを考慮し、中断につながりました。
/は、私たちのコンパイラは積極的に離れて冗長チェックを最適化されたことを除いて、スイッチをチェックしてこれは、 C# のコンパイルと同様でした。
(少数の人々がこれまでに C# でこのスイッチをスローするように思いますので、コードジェネレータは、挿入された小切手を除去する際にほぼ同じ攻撃的な仕事をしません。)この言語およびコンパイラの共同開発のおかげで、その結果は、ほとんどの C++ コンパイラは SafeInt 演算の顔に生成されます何よりもはるかに良好でした。
また、 C# の場合と同様にオーバー/アンダーフローが意図されていたところ、未チェックのスコープ構文を使用することができます。

Although the initial reactions from most C# and C++ developers I've spoken to about this idea are negative about it, our experience was that 9 times out of 10, this approach helped to avoid a bug in the program.
That remaining 1 time was usually an abandonment sometime late in one of our 72 hour stress runs - in which we battered the entire system with browsers and multimedia players and anything else we could do to torture the system - when some harmless counter overflowed.
I always found it amusing that we spent time fixing these instead of the classical way products mature through the stress program, which is to say deadlocks and race conditions.
Between you and me, I'll take the overflow abandonments!
私はこのアイデアについてに話をした初期のほとんどの C# からの反応や C++ 開発者はそれについて否定的であるが、我々の経験では 10 のうち 9 回は、このアプローチはプログラムのバグを回避するのに役立ったということでした。
その残りの 1 時間は、通常中断したいつか後半私たちの 72 時間のストレスのいずれかで動作します - いくつかの無害なカウンタがオーバーフローしたときに - 私たちはブラウザやマルチメディアプレーヤー、我々はシステムを拷問するために何ができる何か他のもので、システム全体を連打します。
私はいつもそれが面白い私たちはこれらの代わりの製品がデッドロックや競合状態を言うことですストレスプログラムを通じて、成熟古典的な方法を固定の時間を費やしたことがわかりました。
あなたと私の間に、私はオーバーフロー中断を取りますよ！

## Out-of-Memory and Stack Overflow

Out-of-memory (OOM) is complicated.
It always is.
And our stance here was certainly contentious also.
アウトオブメモリ( OOM )が複雑です。
それは常にあります。
そして、ここで私たちのスタンスも確かに論争しました。

In environments where memory is manually managed, error code-style of checking is the most common approach:
メモリが手動で管理された環境では、チェックのエラーコードスタイルは、最も一般的な方法は、次のとおりです。

```
X* x = (X*)malloc(...);
if (!x) {
  // Handle allocation failure.
}
```

This has one subtle benefit: allocations are painful, require thought, and therefore programs that use this technique are often more frugal and deliberate with the way they use memory.
But it has a huge downside: it's error prone and leads to huge amounts of frequently untested code-paths.
And when code-paths are untested, they usually don't work.
これは、 1 つの微妙な利点を有する:割り当ては、痛みを伴う思考を必要とするため、この技術を使用するプログラムは、多くの場合、より質素、彼らはメモリを使用する方法で意図的です。
しかし、それは巨大な欠点を持っている:それはエラーが発生しやすいですし、頻繁にテストされていないコードパスの膨大な量につながります。
コードパスがテストされていないされている場合、それらは通常は動作しません。

Developers in general do a terrible job making their software work properly right at the edge of resource exhaustion.
In my experience with Windows and the .NET Framework, this is where egregious mistakes get made.
And it leads to ridiculously complex programming models, like .NET's so-called Constrained Execution Regions.
A program limping along, unable to allocate even tiny amounts of memory, can quickly become the enemy of reliability.
Chris Brumme's wondrous Reliability post describes this and related challenges in all its gory glory.
一般的に、開発者は、リソースの枯渇のエッジで適切に右のソフトウェアを機能させるひどい仕事をします。
とんでもないミスが行われますどこの Windows と.NET Framework との私の経験では、これがあります。
そして、それは、.NET のいわゆる制約実行領域のように、途方もなく複雑なプログラミングモデルにつながります。
沿って足を引きずっプログラムは、メモリのさえ小さな量を割り当てることができ、迅速に信頼性の敵になることができます。
クリス Brumme の不思議な信頼性ポストは、そのすべての血みどろの栄光でこれと関連した課題について説明します。

Parts of our system were of course "hardened" in a sense, like the lowest levels of the kernel, where abandonment's scope would be necessarily wider than a single process.
But we kept this to as little code as possible.
我々のシステムの一部は"硬化"は、中断の範囲は、単一のプロセスよりも必然的に広くなるだろうカーネル、最低レベルのように、ある意味で当然でした。
しかし、我々は可能な限り少ないコードにこれを続けました。


For the rest? Yes, you guessed it: abandonment.
Nice and simple.
残りの？はい、あなたはそれを推測:中断を。
ニースとシンプル。


It was surprising how much of this we got away with.
I attribute most of this to the isolation model.
In fact, we could intentionally let a process suffer OOM, and ensuing abandonment, as a result of resource management policy, and still remain confident that stability and recovery were built in to the overall architecture.
我々が離れて得た方法このくらい驚くべきことでした。
私は、分離モデルにこれのほとんどを属性。
実際には、我々は意図的にプロセスが OOM 苦しむせてできた、と資源管理政策の結果として、中断をその後、更に安定性と回復が全体的なアーキテクチャに組み込まれたことを確信しています。


It was possible to opt-in to recoverable failure for individual allocations if you really wanted.
This was not common in the slightest, however the mechanisms to support it were there.
Perhaps the best motivating example is this: imagine your program wants to allocate a buffer of 1MB in size.
This situation is different than your ordinary run-of-the-mill sub-1KB object allocation.
A developer may very well be prepared to think and explicitly deal with the fact that a contiguous block of 1MB in size might not be available, and deal with it accordingly.
For example:
あなたが本当に望んでいた場合は、オプトインする回復可能な障害のために、個々の割り当てのために可能でした。
しかし、これはそれをサポートするメカニズムがあった、少しも一般的ではありませんでした。
おそらく最高の動機と例がこれです:想像あなたのプログラムは、サイズが 1MB のバッファを割り当てるしたいと考えています。
この状況は、あなたの普通のありふれサブ 1 キロバイトのオブジェクトの割り当てとは異なります。
開発者は、非常によく考え、明示的にサイズが 1 メガバイトの連続したブロックが利用可能で、それに応じてそれに対処されないかもしれないという事実に対処するために調製することができます。
例えば:

```
var bb = try new byte[1024*1024] else catch;
if (bb.Failed) {
  // Handle allocation failure.
}
```

Stack overflow is a simple extension of this same philosophy.
Stack is just a memory-backed resource.
In fact, thanks to our asynchronous linked stacks model, running out of stack was physically identical to running out of heap memory, so the consistency in how it was dealt with was hardly surprising to developers.
Many systems treat stack overflow this way these days.
スタックオーバーフローは、この同じ哲学の単純な拡張です。
スタックはメモリだけでバックアップされたリソースです。
実際には、私たちの非同期のおかげでヒープメモリを使い果たすと物理的に同一であったので、それを扱うされた方法の一貫性は、開発者にはほとんど驚くべきことであったスタックを使い果たして、スタックモデルをリンクされています。
多くのシステムでは、これらの日、スタックオーバーフローをこのように扱います。

## Assertions

An assertion was a manual check in the code that some condition held true, triggering abandonment if it did not.
As with most systems, we had both debug-only and release code assertions, however unlike most other systems, we had more release ones than debug.
In fact, our code was peppered liberally with assertions.
Most methods had multiple.
アサーションは、いくつかの条件はそれがなかった場合は中断をトリガーする、真の開催コードの手動チェックしました。
ほとんどのシステムと同じように、私たちはデバッグ専用の両方を持っていたし、コードのアサーションをリリース、しかし、他のほとんどのシステムとは異なり、我々はデバッグよりリリースのものを持っていました。
実際には、我々のコードはアサーションで自由に浴びせました。
ほとんどの方法は、複数ありました。

This kept with the philosophy that it's better to find a bug at runtime than to proceed in the face of one.
And, of course, our backend compiler was taught how to optimize them aggressively as with everything else.
This level of assertion density is similar to what guidelines for highly reliable systems suggest.
For example, from NASA's paper, The Power of Ten -Rules for Developing Safety Critical Code:
これは、 1 の顔で進行するよりも、実行時にバグを発見した方が良いの哲学と一緒に保管しました。
そして、もちろん、私たちのバックエンドコンパイラは、他のすべてと同様に積極的にそれらを最適化する方法を教えていました。
アサーション密度のこのレベルは、信頼性の高いシステムのためのガイドラインは示唆しているものと同様です。
例えば、 NASA の論文から、セーフティクリティカルコードを開発するための 10 の-rules のパワー:

> Rule: The assertion density of the code should average to a minimum of two assertions per function.
Assertions are used to check for anomalous conditions that should never happen in real-life executions.
Assertions must always be side-effect free and should be defined as Boolean tests.

> Rationale: Statistics for industrial coding efforts indicate that unit tests often find at least one defect per 10 to 100 lines of code written.
The odds of intercepting defects increase with assertion density.
Use of assertions is often also recommended as part of strong defensive coding strategy.

To indicate an assertion, you simply called Debug.Assert or Release.Assert:
>ルール:コードのアサーション密度は機能ごとに 2 つのアサーションの最小値に平均化する必要があります。
アサーションは、実際の実行中に発生してはならない異常な状況をチェックするために使用されています。
アサーションは常に副作用があってはならないとブールテストのように定義する必要があります。

>理由:工業用コーディングの努力のための統計は、ユニットテストは、しばしば書かれたコードの 10 〜 100 行ごとに少なくとも 1 つの欠陥を見つけることを示しています。
インターセプト欠陥のオッズは、アサーション密度とともに増加します。
アサーションの使用は、多くの場合、強力な防御的なコーディング戦略の一環として推奨されています。

アサーションを指定するには、単にデバッグと呼ばれます。アサートまたはリリース。アサート:

```
void Foo() {
  Debug.Assert(something); // Debug-only assert.
  Release.Assert(something); // Always-checked assert.
}
```

We also implemented functionality akin to __FILE__ and __LINE__ macros like in C++ , in addition to __EXPR__ for the text of the predicate expression, so that abandonments due to failed assertions contained useful information.

In the early days, we used different "levels" of assertions than these.
We had three levels, Contract.Strong.Assert, Contract.Assert, and Contract.Weak.Assert.
The strong level meant "always checked," the middle one meant "it's up to the compiler," and the weak one meant "only checked in debug mode." I made the controversial decision to move away from this model.
In fact, I'm pretty sure 49.99% of the team absolutely hated my choice of terminology (Debug.Assert and Release.Assert), but I always liked them because it's pretty unambiguous what they do.
The problem with the old taxonomy was that nobody ever knew exactly when the assertions would be checked; confusion in this area is simply not acceptable, in my opinion, given how important good assertion discipline is to the reliability of one's program.

As we moved contracts to the language (more on that soon), we tried making assert a keyword too.
However, we eventually switched back to using APIs.
The primary reason was that assertions were not part of an API's signature like contracts are; and given that assertions could easily be implemented as a library, it wasn't clear what we gained from having them in the language.
Furthermore, policies like "checked in debug" versus "checked in release" simply didn't feel like they belonged in a programming language.
I'll admit, years later, I'm still on the fence about this.
失敗によるアサーションの中断は、有用な情報が含まれているように、我々はまた、述語式のテキストの__EXPR__に加えて、 C++ のように__FILE__と__LINE__マクロに似た機能を実装しました。

初期の頃で、我々はこれらよりも表明の異なる"レベル"を使用しました。
我々は契約、 3 レベルを有していました。強い。、契約を主張します。アサート、および契約。弱い。アサート。
意味の強いレベルが"常にチェック、"ミドル 1"は、それが、コンパイラ次第です"と弱いものが意味を意味し、"デバッグモードでのみ確認されました。"私はこのモデルから離れて移動するための論争の決定を下しました。
実際に、私はチームの 49.99 パーセントは絶対に専門用語の私の選択(デバッグを嫌ってかなり確信しています。アサートおよびリリース。)アサートが、それは彼らが何をすべきか、かなり明確なのですので、私はいつも彼らが好きでした。
古い分類の問題点は、アサーションがチェックされるときに誰も正確に知っていたということでした。この分野での混乱は良いアサーション規律が自分のプログラムの信頼性がいかに重要であるかを考えると、私の意見では、単純に受け入れられません。

我々は(すぐにその上でより多くの)言語に契約を移動したように、私たちも、キーワードを主張作ってみました。
しかし、最終的には API を使用するようにスイッチバック。
主な理由は、アサーションがある契約のような API の署名の一部ではなかったということでした。アサーションを簡単にライブラリとして実装することができることを考えると、我々が言語でそれらを持っていることから得られるかは明らかではなかったです。
彼らは、プログラミング言語に属していたようにまた、"リリースで確認された "対"デバッグにチェックイン"のような政策は、単に感じませんでした。
私は数年後に、私はこのことについて、フェンスに残っよ、認めますよ。

## Contracts

Contracts were the central mechanism for catching bugs in Midori.
Despite us beginning with Singularity, which used Sing#, a variant of Spe C# , we quickly moved away to vanilla C# and had to rediscover what we wanted.
We ultimately ended up in a very different place after living with the model for years.

All contracts and assertions were proven side-effect free thanks to our language's understanding of immutability and side-effects.
This was perhaps the biggest area of language innovation, so I'll be sure to write a post about it soon.

As with other areas, we were inspired and influenced by many other systems.
Spe C# is the obvious one.
Eiffel was hugely influential especially as there are many published case studies to learn from.
Research efforts like Ada-based SPARK and proposals for realtime and embedded systems too.
Going deeper into the theoretical rabbit's hole, programming logic like Hoare's axiomatic semantics provide the foundation for all of it.
For me, however, the most philosophical inspiration came from CLU's, and later Argus's, overall approach to error handling.
契約は、 Midori のバグをキャッチするための中心的なメカニズムでした。
私たちは歌う＃、スペック＃のバリアントを使用する特異点、で始まるにもかかわらず、我々はすぐにバニラの C# に離れて移動し、私たちが望んで再発見しなければなりませんでした。
我々は最終的に年間のモデルと一緒に生活した後、非常に別の場所で終わりました。

すべての契約とアサーションは不変の私たちの言語の理解への副作用自由感謝と副作用を証明しました。
これはおそらく、言語の技術革新の最大の面積だったので、私はすぐにそれについての記事を書くようにしてくださいます。

他の地域と同じように、我々は他の多くのシステムに触発し、影響を受けました。
スペック＃は明白です。
Eiffel は、から学ぶために多くの公開事例研究がある、特にとして絶大な影響を与えました。
エイダベース SPARK 、あまりにもリアルタイムおよび組込みシステムの提案のような研究努力。
理論上のウサギの穴に深く行く、ホーアの公理的意味論のようなプログラミングロジックはそれのすべてのための基盤を提供します。
私にとっては、しかし、ほとんどの哲学的インスピレーションは CLU の、およびそれ以降のアーガスの、エラー処理するための総合的なアプローチから来ました。

## Preconditions and Postconditions

The most basic form of contract is a method precondition.
This states what conditions must hold for the method to be dispatched.
This is most often used to validate arguments.
Sometimes it's used to validate the state of the target object, however this was generally frowned upon, since modality is a tough thing for programmers to reason about.
A precondition is essentially a guarantee the caller provides to the callee.

In our final model, a precondition was stated using the requires keyword:
契約の最も基本的な形は、メソッドの前提条件です。
これは、メソッドがディスパッチされるための条件が成立しなければならないことを述べています。
これは、ほとんどの場合、引数を検証するために使用されます。
モダリティは、プログラマが約推論するために厳しいものがあるので、時にはしかし、これは一般的に眉をひそめた、ターゲットオブジェクトの状態を検証するために使用されます。
前提条件は、基本的に呼び出し元が呼び出し先に提供する保証です。

私たちの最終的なモデルでは、前提条件は、キーワードを必要と使用して述べました。


```
void Register(string name)
  requires !string.IsEmpty(name) {
  // Proceed, knowing the string isn't empty.
}
```

A slightly less common form of contract is a method postcondition.
This states what conditions hold after the method has been dispatched.
This is a guarantee the callee provides to the caller.

In our final model, a postcondition was stated using the ensures keyword:
契約のわずかに少ない一般的な形式は、メソッドの事後条件です。
これは、メソッドがディスパッチされた後に条件が成立何述べています。
これは、呼び出し先が呼び出し側に提供する保証です。

私たちの最終的なモデルでは、事後条件は、性を保証キーワードを使用して述べました。

```
void Clear()
  ensures Count == 0 {
  // Proceed; the caller can be guaranteed the Count is 0 when we return.
}
```

It was also possible to mention the return value in the postcondition, through the special name return.
Old values - such as necessary for mentioning an input in a post-condition - could be captured through old(..); for example:
特別な名前のリターンを介して、事後条件で戻り値を言及することも可能でした。
古い値 - このような事後条件で入力を言及するために必要なとしては、 - (..)は、古いを介して捕捉することができました。例えば:

```
int AddOne(int value)
  ensures return == old(value)+1 {
  ...
}
```

Of course, pre- and postconditions could be mixed. For example, from our ring buffer in the Midori kernel:
もちろん、事前条件と事後条件を混在させることができました。例えば、 Midori のカーネルにおける当社のリングバッファから:

```
public bool PublishPosition()
  requires RemainingSize == 0
  ensures UnpublishedSize == 0 {
  ...
}
```

This method could safely execute its body knowing that RemainingSize is 0 and callers could safely execute after the return knowing that UnpublishedSize is also 0.
この方法は、安全 RemainingSize が 0 であり、発信者が安全に UnpublishedSize も 0 であることを知って復帰した後に実行することができることを知って、その本体を実行する可能性があります。

If any of these contracts are found to be false at runtime, abandonment occurs.
これらの契約のいずれかが実行時に偽であることが判明した場合、中断が発生します。

This is an area where we differ from other efforts.
Contracts have recently became popular as an expression of program logics used in advanced proof techniques.
Such tools prove truths or falsities about stated contracts, often using global analysis.
We took a simpler approach.
By default, contracts are checked at runtime.
If a compiler could prove truth or falsehood at compile-time, it was free to elide runtime checks or issue a compile-time error, respectively.

Modern compilers have constraint-based analyses that do a good job at this, like the range analysis I mentioned in my last post.
These propagate facts and use them to optimize code already.
This includes eliminating redundant checks: either explicitly encoded in contracts, or in normal program logic.
And they are trained to perform these analyses in reasonable amounts of time, lest programmers switch to a different, faster compiler.
The theorem proving techniques simply did not scale for our needs; our core system module took over a day to analyze using the best in breed theorem proving analysis framework!
これは、我々は他の努力とは異なる領域です。
契約は最近、高度な証明技法で使用するプログラムロジックの表現として人気となっています。
このようなツールは、多くの場合、世界的な分析を使用して、述べ契約に関する真理や falsities を証明します。
我々は単純なアプローチを取りました。
デフォルトでは、契約は、実行時にチェックされます。
コンパイラはコンパイル時に真偽を証明することができれば、それぞれ、実行時チェックを省くか、コンパイル時エラーを発行する無料でした。

最近のコンパイラは私が私の最後のポストで述べた範囲の分析のように、この時に良い仕事を制約ベースの分析を持っています。
これらは、事実を伝播し、すでにコードを最適化するためにそれらを使用しています。
これは、冗長なチェックを排除含まれています:明示的契約でエンコードされた、または通常のプログラムロジックで。
そして彼らは、プログラマは異なる、より高速なコンパイラに切り替えないように、時間の合理的な量でこれらの分析を実行するように訓練されています。
定理証明の技術は、単に私たちのニーズに合わせて拡張できませんでした。当社のコアシステムモジュールは、分析フレームワークを証明品種定理に最善を使用して分析するために一日を引き継ぎました！

Furthermore, the contracts a method declared were part of its signature.
This meant they would automatically show up in documentation, IDE tooltips, and more.
A contract was as important as a method's return and argument types.
Contracts really were just an extension of the type system, using arbitrary logic in the language to control the shape of exchange types.
As a result, all the usual subtyping requirements applied to them.
And, of course, this facilitated modular local analysis which could be done in seconds using standard optimizing compiler techniques.

90-something% of the typical uses of exceptions in .NET and Java became preconditions.
All of the ArgumentNullException, ArgumentOutOfRangeException, and related types and, more importantly, the manual checks and throws were gone.
Methods are often peppered with these checks in C# today; there are thousands of these in .NET's CoreFX repo alone.
For example, here is System.IO.TextReader's Read method:
さらに、この方法は、宣言された契約は、その署名の一部でした。
これは、彼らが自動的にドキュメント、 IDE のツールチップ、およびよりに表示だろう意味しました。
契約は、メソッドの戻り値と引数の型と同様に重要でした。
契約は、実際に交換タイプの形状を制御するための言語で任意の論理を使用して、型システムの拡張子だけでした。
その結果、すべての通常のサブタイプ要件がそれらに適用されます。
そして、もちろん、これは、標準的な最適化コンパイラ技術を使用して数秒で行うことができるモジュラー局所分析を容易にしました。

.NET と Java で例外の一般的な使用の 90 代の％が前提条件となりました。
例外 ArgumentNullException 、例外 ArgumentOutOfRangeException 、および関連する種類のすべてと、より重要なのは、マニュアルをチェックし、スローがなくなっていました。
方法は、多くの場合、今日の C# でこれらのチェックがちりばめています。単独で.NET の CoreFX レポにおけるこれらの何千ものがあります。
例えば、ここでシステムです。 IO.TextReader の Read メソッド:

```
/// <summary>
/// ...
/// </summary>
/// <exception cref="ArgumentNullException">Thrown if buffer is null.</exception>
/// <exception cref="ArgumentOutOfRangeException">Thrown if index is less than zero.</exception>
/// <exception cref="ArgumentOutOfRangeException">Thrown if count is less than zero.</exception>
/// <exception cref="ArgumentException">Thrown if index and count are outside of buffer's bounds.</exception>
public virtual int Read(char[] buffer, int index, int count) {
  if (buffer == null) {
    throw new ArgumentNullException("buffer");
  }
  if (index < 0) {
    throw new ArgumentOutOfRangeException("index");
  }
  if (count < 0) {
    throw new ArgumentOutOfRangeException("count");
  }
  if (buffer.Length - index < count) {
    throw new ArgumentException();
  }
  ...
}
```

This is broken for a number of reasons.
It's laboriously verbose, of course.
All that ceremony! But we have to go way out of our way to document the exceptions when developers really ought not to ever catch them.
Instead, they should find the bug during development and fix it.
All this exception nonsense encourages very bad behavior.

If we use Midori-style contracts, on the other hand, this collapses to:
これは、いくつかの理由で壊れています。
これはもちろん、苦労冗長です。
すべてのことセレモニー！しかし、我々はときに、開発者は本当に今までにそれらをキャッチべきではない例外を文書化するために私達の方法から抜け出す道を行かなければなりません。
その代わりに、彼らは開発中にバグを見つけ、それを修正する必要があります。
このすべての例外ナンセンスは非常に悪い行動を奨励しています。

私たちは Midori スタイルの契約を使用する場合は、他の一方で、これはに崩壊します:

```
/// <summary>
/// ...
/// </summary>
public virtual int Read(char[] buffer, int index, int count)
  requires buffer != null
  requires index >= 0
  requires count >= 0
  requires buffer.Length - index >= count {
  ...
}
```

There are a few appealing things about this.
First, it's more concise.
More importantly, however, it self-describes the contract of the API in a way that documents itself and is easy to understand by callers.
Rather than requiring programmers to express the error condition in English, the actual expressions are available for callers to read, and tools to understand and leverage.
And it uses abandonment to communicate failure.

I should also mention we had plenty of contracts helpers to help developers write common preconditions.
The above explicit range checking is very messy and easy to get wrong.
Instead, we could have written:
このことについて、いくつかの魅力的なものがあります。
まず、それはより簡潔です。
さらに重要なことは、しかし、それは自分自身を文書化し、発信者が理解しやすい方法で、 API の契約を自己記述する。
むしろ英語でエラー状態を表現するために、プログラマを要求するのではなく、発信者が読むための実際の表現が利用可能であり、ツールが理解し、活用します。
そして、それは失敗を伝えるために中断を使用しています。

私はまた、我々は、開発者が共通の前提条件を記述するのに役立つ契約ヘルパーの多くを持っていた言及する必要があります。
上記の明示的な範囲のチェックは非常に面倒で間違えやすいです。
その代わりに、我々は書かれている可能性があり:

```
public virtual int Read(char[] buffer, int index, int count)
  requires buffer != null
  requires Range.IsValid(index, count, buffer.Length) {
  ...
}
```

And, totally aside from the conversation at hand, coupled with two advanced features - arrays as slices and non-null types - we could have reduced the code to the following, while preserving the same guarantees:
そして、完全に脇に手での会話から、 2 高度な機能と相まって - スライスと null 以外の種類として配列 - 同じ保証を維持しながら、私たちは、次のようにコードを減少していることができます:

```
public virtual int Read(char[] buffer) {
  ...
}
```

But I'm jumping way ahead …
しかし、私はずっと先にジャンプしています...

## Humble Beginnings
##卑賤

Although we landed on the obvious syntax that is very Eiffel- and Spe C# -like - coming full circle - as I mentioned earlier, we really didn't want to change the language at the outset.
So we actually began with a simple API approach:

完全な円を来て - - 私たちは非常に Eiffel-とスペック＃の様である明白な構文に上陸したが、私は先に述べたように、私たちは本当に最初に言語を変更する必要はありませんでした。
だから我々は、実際には、単純な API のアプローチで始まりました:


```
public bool PublishPosition() {
  Contract.Requires(RemainingSize == 0);
  Contract.Ensures(UnpublishedSize == 0);
  ...
}
```

There are a number of problems with this approach, as the .NET Code Contracts effort discovered the hard way.

First, contracts written this way are part of the API's implementation, whereas we want them to be part of the signature.
This might seem like a theoretical concern but it is far from being theoretical.
We want the resulting program to contain built-in metadata so tools like IDEs and debuggers can display the contracts at callsites.
And we want tools to be in a position to auto-generate documentation from the contracts.
Burying them in the implementation doesn't work unless you somehow disassemble the method to extract them later on (which is a hack).

This also makes it tough to integrate with a backend compiler which we found was necessary for good performance.

Second, you might have noticed an issue with the call to Contract.Ensures.
Since Ensures is meant to hold on all exit paths of the function, how would we implement this purely as an API? The answer is, you can't.
One approach is rewriting the resulting MSIL, after the language compiler emitted it, but that's messy as all heck.
At this point, you begin to wonder, why not simply acknowledge that this is a language expressivity and semantics issue, and add syntax?

Another area of perpetual struggle for us was whether contracts are conditional or not.
In many classical systems, you'd check contracts in debug builds, but not the fully optimized ones.
For a long time, we had the same three levels for contracts that we did assertions mentioned earlier:
.NET コード契約の努力は、ハードな方法を発見したように、このアプローチには多くの問題があります。

我々は彼らが署名の一部になりたいのに対し、まず、このように書かれた契約は、 API の実装の一部です。
これは理論上の懸念のように見えるかもしれませんが、それは理論的には程遠いです。
私たちは、 IDE やデバッガなどのツールが callsites で契約を表示することができますので、結果として得られるプログラムが内蔵されたメタデータを含むようにしたいです。
そして、我々はツールが契約から自動生成ドキュメントへの立場になりたいです。
あなたが何らかの形で(ハックです)後でそれを展開するための方法を分解しない限り、実装でそれらを埋め込むすることはできません。

これはまた、我々は良好なパフォーマンスを得るために必要であったが見つかりましたバックエンドコンパイラと統合することがタフになります。

第二に、あなたは契約を呼び出して問題に気づいたかもしれません。保証します。
確実には、関数のすべての出口パスに保持するために意図されているので、どのように我々は、 API として純粋にこれを実装するのでしょうか？答えは、あなたがすることはできません。
言語コンパイラはそれを放出された後、一つのアプローチは、結果の MSIL を書き換えされていますが、それはすべて一体として厄介です。
この時点で、あなたは、なぜ単にこれは言語の表現力と意味論の問題であることを認め、構文を追加しないだろうし始めますか？

私たちにとって永遠の闘争の別の領域は、契約が条件付きであるか否かでした。
多くの古典的なシステムでは、あなたは完全に最適化されたものをデバッグビルドで契約を確認しますが、ないと思います。
長い間、私たちは先に述べたアサーションをした契約について同じ 3 つのレベルを持っていました:

- Weak, indicated by Contract.Weak.*, meaning debug-only.
- Normal, indicated simply by Contract.*, leaving it as an implementation decision when to check them.
- Strong, indicated by Contract.Strong.*, meaning always checked.
- 弱い、契約によって示されます。弱い。*、デバッグ専用という意味。
- 通常は、契約によって単に示さ*、それらを確認するために実装決定としてそれを残して。
- 強力な、契約によって示されます。強い。*、常にチェックを意味します。


I'll admit, I initially found this to be an elegant solution.
Unfortunately, over time we found that there was constant confusion about whether "normal" contracts were on in debug, release, or all of the above (and so people misused weak and strong accordingly).
Anyway, when we began integrating this scheme into the language and backend compiler toolchain, we ran into substantial issues and had to backpedal a little bit.

First, if you simply translated Contract.Weak.Requires to weak requires and Contract.Strong.Requires to strong requires, in my opinion, you end up with a fairly clunky and specialized language syntax, with more policy than made me comfortable.
It immediately calls out for parameterization and substitutability of the weak/strong policies.

Next, this approach introduces a sort of new mode of conditional compilation that, to me, felt awkward.
In other words, if you want a debug-only check, you can already say something like:
私は当初、これはエレガントなソリューションであることが判明し、認めますよ。
残念ながら、時間をかけて私たちは、"通常の"契約は、デバッグ中にリリースした、または上記のすべて(そのため、人々はそれに応じて弱いと強い誤用)かどうかについて一定の混乱があったことがわかりました。
私たちは言語とバックエンドコンパイラツールチェーンにこの方式を統合し始めたときとにかく、私たちはかなりの問題に遭遇したと少し逆に踏む必要がありました。

まず、あなたは、単に契約を翻訳した場合。弱い。弱いが必要であり、契約に必要です。強い。強いが必要とする、私の意見では、あなたは私が快適に作られたよりも多くのポリシーで、かなり不格好や専門言語構文で終わる必要があります。
それはすぐに弱い/強いポリシーのパラメータ化と代替性のために呼び出します。

次に、このアプローチは、私には、ぎこちない感じた条件付きコンパイルの新しいモードのようなものを紹介します。
あなたは、デバッグ専用チェックする場合は、言い換えれば、あなたはすでにのような何かを言うことができます。

```
#if DEBUG
  requires X
#endif
```

Finally - and this was the nail in the coffin for me - contracts were supposed to be part of an API's signature.
What does it even mean to have a conditional contract? How is a tool supposed to reason about it? Generate different documentation for debug builds than release builds? Moreover, as soon as you do this, you lose a critical guarantee, which is that code doesn't run if its preconditions aren't met.

As a result, we nuked the entire conditional compilation scheme.

We ended up with a single kind of contract: one that was part of an API's signature and checked all the time.
If a compiler could prove the contract was satisfied at compile-time - something we spent considerable energy on - it was free to elide the check altogether.
But code was guaranteed it would never execute if its preconditions weren't satisfied.
For cases where you wanted conditional checks, you always had the assertion system (described above).

I felt better about this bet when we deployed the new model and found that lots of people had been misusing the "weak" and "strong" notions above out of confusion.
Forcing developers to make the decision led to healthier code.
最後に - これは私のための棺内釘だった - 契約は、 API の署名の一部となっていました。
それも条件付きの契約を結んでいるためには何を意味するのでしょうか？どのようなツールは、それについて推論することになっていますか？デバッグはリリースビルドよりもビルドに異なるドキュメントを生成？また、できるだけ早くあなたがこれを行うように、あなたは、その前提条件が満たされていない場合、コードが実行されないということである重要な保証を失います。

その結果、我々は全体の条件付きコンパイル方式を被爆しました。

API の署名の一部であったとすべての時間をチェックし 1 :我々は、契約の一種類になってしまいました。
コンパイラは、契約がコンパイル時に満足していたことを証明することができれば - 私達は上でかなりのエネルギーを費やした何か - それは完全にチェックを省くこと自由でした。
しかし、コードは、その前提条件が満たされなかった場合、それは実行しないであろう保証されていました。
あなたは条件付きチェックを望んでいた場合のために、あなたは常に(上記の)アサーションシステムを持っていました。

我々は新しいモデルを展開し、多くの人々は混乱のうち上記"弱い"と"強い"の概念を悪用していたことがわかったとき、私はこの賭けについてよりよく感じました。
健康的なコードにつながった決定を行うために開発者を強制。

## Future Directions

A number of areas of development were at varying stages of maturity when our project wound down.
私たちのプロジェクトがダウンして巻かれたときに、開発の領域の数は、成熟の様々な段階でした。

### Invariants

We experimented a lot with invariants.
Anytime we spoke to someone versed in design-by-contract, they were borderline appalled that we didn't have them from day one.
To be honest, our design did include them from the outset.
But we never quite got around to finishing the implementation and deploying it.
This was partly just due to engineering bandwidth, but also because some difficult questions remained.
And honestly the team was almost always satisfied with the combination of pre- and post-conditions plus assertions.
I suspect that in the fullness of time we'd have added invariants for completeness, but to this day some questions remain for me.
I'd need to see it in action for a while.

The approach we had designed was where an invariant becomes a member of its enclosing type; for example:
私たちは不変量で多くの実験を行いました。
いつでも我々は、契約による設計に精通して誰かに話し、彼らは我々が初日からそれらを持っていなかったことをボーダーラインゾッとしました。
正直に言うと、私たちのデザインは最初からそれらを含めるでした。
しかし、我々は非常に実装を終えて、それを展開する周りにやったことがなかったです。
これはただの一部はエンジニアリングの帯域幅によるものであったが、またいくつかの困難な問題が残っているため。
そして、正直チームは、ほとんどの場合、前後の状態に加えて、アサーションの組み合わせで満足していました。
私は時間の膨満感に私たちは完全性について、いくつかの質問が私のために残っているこの日に不変条件を追加しているだろうと思われます。
私はしばらくの間、アクションでそれを参照してくださいする必要があると思います。

不変はそのエンクロージング型のメンバーになりますどこに我々が設計したアプローチがありました。例えば:

```
public class List<T> {
  private T[] array;
  private int count;
  private invariant index >= 0 && index < array.Length;
...
}
```

Notice that the invariant is marked private.
An invariant's accessibility modifier controlled which members the invariant was required to hold for.
For example, a public invariant only had to hold at the entry and exit of functions with public accessibility; this allowed for the common pattern of private functions temporarily violating invariants, so long as public entrypoints preserved them.
Of course, as in the above example, a class was free to declare a private invariant too, which was required to hold at all function entries and exits.

I actually quite liked this design, and I think it would have worked.
The primary concern we all had was the silent introduction of checks all over the place.
To this day, that bit still makes me nervous.
For example, in the `List<T>` example, you'd have the `index >= 0 && index < array.Length` check at the beginning and end of every single function of the type.
Now, our compiler eventually got very good at recognizing and coalescing redundant contract checks; and there were ample cases where the presence of a contract actually made code quality better.
However, in the extreme example given above, I'm sure there would have been a performance penalty.
That would have put pressure on us changing the policy for when invariants are checked, which would have possibly complicated the overall contracts model.

I really wish we had more time to explore invariants more deeply.
I don't think the team sorely missed not having them - certainly I didn't hear much complaining about their absence (probably because the team was so performance conscious) - but I do think invariants would have been a nice icing to put on the contracts cake.
不変にプライベートのマークが付いていることに注意してください。
不変のために保持するために必要とされたメンバー不変のアクセシビリティ修飾子制御。
例えば、公共不変では唯一の公共アクセシビリティ機能の入り口と出口で保持しなければなりませんでした。これはあまりにも長い間、パブリックエントリポイントがそれらを保存として、一時的に不変条件を違反プライベート関数の一般的なパターンを可能にしました。
もちろん、上記の例のように、クラスは、すべての関数のエントリと終了時に保持するために必要とされた、あまりにもプライベート不変を宣言して自由でした。

私は実際には非常にこのデザインが好き、と私はそれが働いていると思います。
我々はすべてが持っていた主な関心事は、すべての場所の上のチェックのサイレント導入しました。
この日に、そのビットはまだ私が神経質になります。
たとえば、 `リスト<T>`の例では、 `インデックス> = 0 &&インデックス<配列を持っていると思います。タイプのすべての単一機能の開始時と終了時に確認してください Length`。
今、私たちのコンパイラは、最終的に認識し、冗長契約のチェックを合体で非常に良好です。契約の存在が実際にコードの品質良好に十分な場合がありました。
しかし、上記の極端な例では、私はパフォーマンスの低下があっただろうと確信しています。
それはおそらく、全体の契約モデルを複雑にしているだろう不変条件がチェックされたときのポリシーを変える私たちに圧力をかけているだろう。

私は本当に私たちがより深く不変条件を探るために多くの時間があればいいのに。
(おそらくチームはとてもパフォーマンスを意識したので)確かに、私はずっと彼らの不在に文句を聞いていなかった - - 私はチームが痛んでそれらを持っていない逃したとは思わないが、私は不変条件を置くために素敵なアイシングされているだろうと思います契約ケーキ。

## Advanced Type Systems

I always liked to say that contracts begin where the type system leaves off.
A type system allows you to encode attributes of variables using types.
A type limits the expected range values that a variable might hold.
A contract similarly checks the range of values that a variable holds.
The difference? Types are proven at compile-time through rigorous and composable inductive rules that are moderately inexpensive to check local to a function, usually, but not always, aided by developer-authored annotations.
Contracts are proven at compile-time where possible and at runtime otherwise, and as a result, permit far less rigorous specification using arbitrary logic encoded in the language itself.

Types are preferable, because they are guaranteed to be compile-time checked; and guaranteed to be fast to check.
The assurances given to the developer are strong and the overall developer productivity of using them is better.

Limitations in a type system are inevitable, however; a type system needs to leave some wiggle room, otherwise it quickly grows unwieldly and unusable and, in the extreme, devolves into bi-value bits and bytes.
On the other hand, I was always disappointed by two specific areas of wiggle room that required the use of contracts:
私はいつも型システムがオフの葉どこ契約が始まることを言うのが好き。
型システムでは、型を使用して変数の属性をエンコードすることができます。
タイプは、変数が保持している可能性のある予想される範囲の値を制限します。
契約は、同様に、変数が保持する値の範囲をチェックします。
違い？タイプは通常、関数にローカルチェックして適度に安価であり、厳格かつ構成可能な誘導性規則を通じてコンパイル時に証明され、常にではないが、開発者が執筆した注釈によって支援されています。
契約は、結果として、言語自体でエンコードされた任意の論理を使用してはるかに少ない厳しい仕様を可能にすることが可能とそうでない場合は、実行時に、およびコンパイル時に実証されています。

それらはコンパイル時にチェックであることが保証されているので種類は、好ましいです。そして、チェックして高速であることが保証。
開発者に与えられた保証が強く、それらを使用しての全体的な開発者の生産性が優れています。

型システムの制限は、しかし、避けられません。型システムは、いくつかの余地を残すために必要がある、それ以外の場合はすぐに極端に、 unwieldly 、使用できなく成長し、二値のビットとバイトに委譲します。
一方、私は常に契約の利用を必要余地の 2 つの特定の領域に失望しました。

1. Nullability.
2. Numeric ranges.
1. NULL 値を許容するかどうか。
2. 数値範囲。


Approximately 90% of our contracts fell into these two buckets.
As a result, we seriously explored more sophisticated type systems to classify the nullability and ranges of variables using the type system instead of contracts.

To make it concrete, this was the difference between this code which uses contracts:
当社の契約の約 90 ％は、これらの 2 つのバケットに落ちました。
その結果、我々は真剣に NULL 値を許可するかどうかと契約するのではなく、型システムを使用して変数の範囲を分類するために、より洗練されたタイプのシステムを検討しました。

それは具体的にするために、これは契約を利用して、このコードの違いはありました:

```
public virtual int Read(char[] buffer, int index, int count)
  requires buffer != null
  requires index >= 0
  requires count >= 0
  requires buffer.Length - index < count {
  ...
}
```

And this code which didn't need to, and yet carried all the same guarantees, checked statically at compile-time:
そして、する必要があり、まだすべて同じ保証を行っていなかった、このコードは、コンパイル時に静的にチェック:

```
public virtual int Read(char[] buffer) {
  ...
}
```

Placing these properties in the type system significantly lessens the burden of checking for error conditions.
Lets say that for any given 1 producer of state there are 10 consumers.
Rather than having each of those 10 defend themselves against error conditions, we can push the responsibility back onto that 1 producer, and either require a single assertion that coerces the type, or even better, that the value is stored into the right type in the first place.

型システムでこれらのプロパティを配置すると、大幅にエラー状態をチェックするの負担を軽減します。
状態の任意の 1 の生産のための 10 の消費者があることを言うことができます。
むしろ、これらの 10 のそれぞれを持つエラー状態から身を守るよりも、我々は値が右型に格納されていること、その 1 プロデューサーに戻し責任をプッシュし、いずれかのより良いタイプを強制的、または単一のアサーションを要求することができます最初の場所。

## Non-Null Types

The first one's really tough: guaranteeing statically that variables do not take on the null value.
This is what Tony Hoare has famously called his "billion dollar mistake".
Fixing this for good is a righteous goal for any language and I'm happy to see newer language designers tackling this problem head-on.

Many areas of the language fight you every step of the way on this one.
Generics, zero-initialization, constructors, and more.
Retrofitting non-null into an existing language is tough!
最初のものは本当にタフだ:変数が null 値を取らないことを静的に保証します。
これは、アントニーホーアが有名な彼の "十億ドル規模のミス"と呼ばれているものです。
良いのためにこれを修正するには、任意の言語のための正義の目標であると私は、この問題を真正面から取り組む新しい言語設計者を見てうれしいです。

言語の多くの地域は、あなたにこの 1 上の方法のあらゆるステップを戦います。
ジェネリック医薬品、ゼロ初期化、コンストラクタ、およびより多くの。
既存の言語に null 以外の改造することは難しいです！

### The Type System

In a nutshell, non-nullability boiled down to some simple type system rules:
一言で言えば、非 NULL 値を許可するかどうかは、いくつかの単純な型システムの規則に煮詰め:

1. All unadorned types T were non-null by default.
2. Any type could be modified with a ?, as in T?, to mark it nullable.
3. null is an illegal value for variables of non-null types.
4. T implicitly converts to T?. In a sense, T is a subtype of T? (although not entirely true).
5. Operators exist to convert a T? to a T, with runtime checks that abandoned on null.
1. すべての飾り気のないタイプ T は、デフォルトでは null 以外でした。
2. 任意のタイプで修正されるだろうか？、 T のように？ NULL 可能で、それをマークします。
3. null は null 以外の型の変数の値が不正です。
4. T は暗黙的に T に変換します？ある意味で、 T は T のサブタイプでありますか？(完全に真実ではないが)。
5. オペレータは T を変換するために存在しますか？ヌルに中断された実行時チェックと、 T へ。

Most of this is probably "obvious" in the sense that there aren't many choices.
The name of the game is systematically ensuring all avenues of null are known to the type system.
In particular, no null can ever "sneakily" become the value of a non-null T type; this meant addressing zero-initialization, perhaps the hardest problem of all.
これのほとんどは多くの選択肢が存在しないという意味で、おそらく"明らか"です。
ゲームの名前は、体系的な型システムに知られているヌルのすべての道を確保することです。
特に、ヌルは、これまで"こそこそ" null 以外の T 型の値になることはできません。これは、ゼロ初期化、すべてのおそらく最も困難な問題に対処する意味しました。

## The Syntax

Syntactically, we offered a few ways to accomplish #5, converting from T? to T.
Of course, we discouraged this, and preferred you to stay in "non-null" space as long as possible.
But sometimes it's simply not possible.
Multi-step initialization happens from time to time - especially with collections data structures - and had to be supported.

Imagine for a moment we have a map:
構文的には、我々は T からの変換、＃ 5 を達成するためにいくつかの方法を提供しましたか？ T.へ
もちろん、我々はこれをお勧めし、できるだけ長く"非ヌル"空間に滞在するあなたを好みました。
しかし、時にはそれは単に不可能です。
特にコレクションのデータ構造で - - 多段階の初期化は、随時発生し、サポートしなければなりませんでした。

私たちは地図を持っている瞬間を想像してみてください。

```
Map<int, Customer> customers = ...;
```

This tells us three things by construction:

The Map itself is not null.
The int keys inside of it will not be null.
The Customer values inside of it will also not be null.
Let's now say that the indexer actually returns null to indicate the key was missing:
これは建設によって私たちに 3 つのことを伝えます:

地図自体が null ではありません。
その中の int 型のキーは NULL にすることはできません。
その中の顧客値も NULL にすることはできません。
それでは、インデクサーが実際に欠けていたキーを示すために null を返すとしましょう:


```
public TValue? this[TKey key] {
  get { ... }
}
```

Now we need some way of checking at callsites whether the lookup succeeded. We debated many syntaxes.
今、私たちは、ルックアップが成功したかどうか callsites でチェックするいくつかの方法が必要です。我々は、多くの構文を議論しました。

The easiest we landed on was a guarded check:
私たちがしたガード付きチェックに上陸した最も簡単:

```
Customer? customer = customers[id];
if (customer != null) {
  // In here, `customer` is of non-null type `Customer`.
}
```

I'll admit, I was always on the fence about the "magical" type coercions.
It annoyed me that it was hard to figure out what went wrong when it failed.
For example, it didn't work if you compared c to a variable that held the null value, only the literal null.
But the syntax was easy to remember and usually did the right thing.

These checks dynamically branch to a different piece of logic if the value is indeed null.
Often you'd want to simply assert that the value is non-null and abandon otherwise.
There was an explicit type-assertion operator to do that:
私は"魔法"型の強制についてのフェンスに常にあった、認めますよ。
それが失敗したときに何が悪かったのかを把握することは困難であったことを私にイライラ。
あなたが NULL 値のみリテラルヌルを保持していた変数に C を比較した場合例えば、それは動作しませんでした。
しかし、構文は、覚えやすいし、通常は正しいことをしました。

値が実際に null の場合これらのチェックは、動的論理の異なる作品に分岐します。
多くの場合、あなたは単に値が非 NULL であることを主張する、そうでなければ中断したいと思います。
そのための明示的な型アサーションのオペレータがありました:

```
Customer? maybeCustomer = customers[id];
Customer customer = notnull(maybeCustomer);
```

The notnull operator turned any expression of type T? into an expression of type T.
NOTNULL 演算子は型 T の任意の式を回しましたか？型 T の式に

### Generics

Generics are hard, because there are multiple levels of nullability to consider. Consider:
考慮すべき NULL 値を許容するかどうかの複数のレベルがあるので、ジェネリック医薬品は、難しいです。考えてみましょう:

```
class C {
  public T M<T>();
  public T? N<T>();
}

var a = C.M<object>();
var b = C.M<object?>();
var c = C.N<object>();
var d = C.N<object?>();
```

The basic question is, what are the types of a, b, c, and d?
基本的な問題は、 B 、 C 、 D の種類どのようなものですか？

I think we made this one harder initially than we needed to largely because C# 's existing nullable is a pretty odd duck and we got distracted trying to mimic it too much.
The good news is we finally found our way, but it took a while.
私たちは難しく、最初は C# の既存の NULL 可能ではかなり奇妙なアヒルであり、我々はあまりにも多くのそれを模倣しようと気を取られてしまった主な理由私たちがするのに必要なよりも、この 1 を作ったと思います。
良いニュースは、我々は最終的に我々の方法を発見されたが、それはしばらく時間がかかりました。

To illustrate what I mean, let's go back to the example.
There are two camps:
私が何を意味するか説明するために、例に戻りましょう。
二つの陣営があります。

- The .NET camp: a is object; b, c, and d are object?.
- The functional language camp: a is object; b and c are object?; d is object??.
- .NET キャンプ:オブジェクトです。 B 、 C 、 D は物体であります？
- 関数型言語のキャンプは:オブジェクトです。 b 及び c は、オブジェクトがありますか？; d は??オブジェクトです。

In other words, the .NET camp thinks you should collapse any sequence of 1 or more ?s into a single ?.
The functional language camp - who understands the elegance of mathematical composition - eschews the magic and lets the world be as it is.
We eventually realized that the .NET route is incredibly complex, and requires runtime support.
つまり、.NET キャンプでは、 1 以上の任意のシーケンスを折りたたむ必要があります考えていますか？シングルへの？。
関数型言語キャンプ - 数学的な構図の優雅さを理解する - 魔法を控え、そのまま世界があることができます。
我々は最終的には、.NET のルートは非常に複雑であることに気づき、およびランタイムサポートを必要とします。

The functional language route does bend your mind slightly at first.
For example, the map example from earlier:
関数型言語のルートは、最初は少しあなたの心を曲げません。
例えば、以前からマップの例:

```
Map<int, Customer?> customers = ...;
Customer?? customer = customers[id];
if (customer != null) {
  // Notice, `customer` is still `Customer?` in here, and could still be `null`!
}
```

In this model, you need to peel off one layer of ? at a time.
But honestly, when you stop to think about it, that makes sense.
It's more transparent and reflects precisely what's going on under here.
Best not to fight it.

There's also the question of implementation.
The easiest implementation is to expand T? into some "wrapper type," like Maybe<T>, and then inject the appropriate wrap and unwrap operations.
Indeed, that's a reasonable mental model for how the implementation works.
There are two reasons this simple model doesn't work, however.

First, for reference type T, T? must not carry a wasteful extra bit; a pointer's runtime representation can carry null as a value already, and for a systems language, we'd like to exploit this fact and store T? as efficiently as T.
This can be done fairly easily by specializing the generic instantiation.
But this does mean that non-null can no longer simply be a front-end trick.
It requires back-end compiler support.
このモデルでは、 1 層をはがす必要がありますか？一度に。
あなたはそれについて考えるために停止したときにしかし、正直なところ、それは理にかなっています。
これは、より透明だし、ここの下で何が起こっているか正確に反映しています。
それを戦うしないことをお勧め。

実装の問題もあります。
最も簡単な実装では、 T を拡張するのですか？たぶん、<T>のようないくつかの "ラッパー型"にして、適切なラップやアンラップ操作を注入。
確かに、それは実装がどのように動作するかのための合理的なメンタルモデルです。
この単純なモデルは、しかし、動作しない理由は 2 つあります。

まず、参照型 T のために、 T ？無駄な余分なビットを運ぶことはいけません。ポインタの実行時表現は、すでに値として null を運ぶことができ、およびシステムの言語のために、私たちはこの事実とストア T を利用したいのですが？効率的に T として
これは、一般的なインスタンス化を専門とすることによって、かなり簡単に行うことができます。
しかし、これは null 以外は、もはや単にフロントエンドトリックすることができないことを意味します。
これは、バックエンドのコンパイラのサポートを必要とします。

(Note that this trick is not so easy to extend to T??!)
(このトリックが T ??に拡張するのは容易ではないことに注意してください！)

Second, Midori supported safe covariant arrays, thanks to our mutability annotations.
If T and T? have a different physical representation, however, then converting T[] to T?[] is a non-transforming operation.
This was a minor blemish, particularly since covariant arrays become far less useful once you plug the safety holes they already have.

Anyway, we eventually burned the ships on .NET Nullable<T> and went with the more composable multi-? design.
第二に、 Midori は、私たちの可変性の注釈のおかげで安全な共変アレイをサポート。
T と T の場合？その後、 T は[] T への変換、しかし、異なる物理的表現がありますか？[]非変換操作です。
これは、彼らがすでに持っている安全上の穴を塞ぐ一度共変アレイがはるかに役立つようになり、特に以来、マイナーな傷でした。

とにかく、我々は最終的には、.NET の Nullable <T>に船を燃やし、より構成可能なマルチと一緒に行きましたか？設計。

### Zero-Initialization

Zero-initialization is a real pain in the butt. To tame it meant:
ゼロ初期化はお尻の本当の痛みです。飼いならすためには、意味しました:

- All non-null fields of a class must be initialized at construction time.
- All arrays of non-null elements must be fully initialized at construction time.
But it gets worse.
In .NET, value types are implicitly zero-initialized.
The initial rule was therefore:

- All fields of a struct must be nullable.
- クラスのすべての非 NULL フィールドは、構築時に初期化する必要があります。
- null でない要素のすべての配列は、完全に構築時に初期化する必要があります。
しかし、それは悪化します。
.NET では、値のデータ型は、暗黙的にゼロ初期化されます。
最初のルールがありましたので:

- 構造体のすべてのフィールドが NULL 可能でなければなりません。

But that stunk.
It infected the whole system with nullable types immediately.
My hypothesis was that nullability only truly works if nullable is the uncommon (say 20%) case.
This would have destroyed that in an instant.
しかし、それは stink の過去形。
それはすぐに NULL 可能タイプで、システム全体を感染させました。
私の仮説は NULL 可能では珍しい(例えば 20 ％)の場合であれば NULL 値を許可するかどうかのみ、真に機能するということでした。
これは、その瞬間に破壊されたであろう。

So we went down the path of eliminating automatic zero-initialization semantics.
This was quite a large change.
( C# 6 went down the path of allowing structs to provide their own zero-arguments constructors and eventually had to back it out due to the sheer impact this had on the ecosystem.) It could have been made to work but veered pretty far off course, and raised some other problems that we probably got too distracted with.
If I could do it all over again, I'd just eliminate the value vs.
reference type distinction altogether in C# .
The rationale for that'll become clearer in an upcoming post on battling the garbage collector.
だから我々は、自動ゼロ初期化のセマンティクスを排除するパスを下って行きました。
これは非常に大きな変化でした。
( C# 6 は、構造体は、独自のゼロ引数のコンストラクタを提供することを可能にする道を下って行き、最終的に起因し、これは生態系に与えた薄手の影響にそれをバックアウトする必要がありました。)動作するように作られたが、もちろん、かなり遠い方向転換し、我々はおそらくとあまりにも気を取ら得たいくつかの他の問題を提起されている可能性があります。
私はすべての繰り返しそれを行うことができれば、私はちょうど値対を排除したいです
 C# で完全に参照型の区別。
そのための理論的根拠は、ガベージコレクタを戦っ上で、今後の投稿で明らかになるだろう。

### The Fate of Non-Null Types

We had a solid design, and several prototypes, but never deployed this one across the entire operating system.
The reason why was tied up in our desired level of C# compatibility.
To be fair, I waffled on this one quite a bit, and I suppose it was ultimately my decision.
In the early days of Midori, we wanted "cognitive familiarity." In the later days of the project, we actually considered whether all of the features could be done as "add on" extensions to C# .
It was that later mindset that prevented us from doing non-null types in earnest.
My belief to this day is that additive annotations just won't work; Spe C# tried this with ! and the polarity always felt inverted.
Non-null needs to be the default for this to have the impact we desired.
我々は固体の設計、およびいくつかのプロトタイプを持っていましたが、オペレーティングシステム全体を横切って、このいずれかを展開することはありません。
 C# の互換性の私達の所望のレベルに縛られた理由。
公平を期すために、私はかなりこの 1 ビットのワッフル、と私はそれが最終的に私の決断だったとします。
Midori の初期の頃で、私たちは"認知親しみやすさ"を望んでいましたプロジェクトの数日後に、我々は実際には C# に拡張子"アドオン"としての機能のすべてを行うことができるかどうかを検討しました。
これは本格的に null 以外の種類をやってから私たちを防ぐこと後で考え方でした。
この日に私の信念は、添加剤のアノテーションがうまく動作しないことです。スペック＃でこれを試してみました！そして、極性が常に反転感じました。
null 以外は、これは我々が希望のインパクトを持っているためにデフォルトにする必要があります。

One of my biggest regrets is that we waited so long on non-null types.
We only explored it in earnest once contracts were a known quantity, and we noticed the thousands of requires x != nulls all over the place.
It would have been complex and expensive, however this would have been a particularly killer combination if we nuked the value type distinction at the same time.
Live and learn!
私の最大の後悔の一つは、我々が null 以外の種類に限り待っていたということです。
契約が既知量であった、そして我々は、 x を必要とする何千ものに気づいたら、私たちは本格的にそれを探求しました！=すべての場所でゼロにします。
我々は同時に値型の区別を被爆場合、それは複雑で高価であったであろう、しかしこれは、特にキラー組み合わせだったでしょう。
生活し、学びます！

If we shipped our language as a standalone thing, different from C# proper, I'm convinced this would have made the cut.
我々は C# 、適切とは異なるスタンドアロンのもの、として私たちの言語を出荷した場合、私はこのカットをしただろう確信しています。

#### Range Types

We had a design for adding range types to C# , but it always remained one step beyond my complexity limit.
我々は、 C# の範囲のタイプを追加するためのデザインを持っていたが、それはいつも私の複雑さの限界を超えて一歩を残りました。

The basic idea is that any numeric type can be given a lower and upper bound type parameter.
For example, say you had an integer that could only hold the numbers 0 through 1,000,000, exclusively.
It could be stated as `int<0..1000000>`.
Of course, this points out that you probably should be using a uint instead and the compiler would warn you.
In fact, the full set of numbers could be conceptually represented as ranges in this way:
基本的な考え方は、任意の数値型の下限と上限型パラメータを与えることができることです。
たとえば、あなたが唯一の排他的に、 0 1,000,000 までの数字を保持することができ整数を持っていたと言います。
これは、 `int 型<0..1000000>`として記載することができました。
もちろん、これはおそらく uint ではなくを使用すべきであるとコンパイラが警告を発しだろうと指摘しています。
実際には、数字のフルセットは、概念的に、このように範囲として表すことができます:

```
typedef byte number<0..256>;
typedef sbyte number<-128..128>;
typedef short number<-32768..32768>;
typedef ushort number<0..65536>;
typedef int number<-2147483648..2147483648>;
typedef uint number<0..4294967295>;
// And so on ...
```

The really "cool" - but scary complicated - part is to then use dependent types to permit symbolic range parameters.
For example, say I have an array and want to pass an index whose range is guaranteed to be in-bounds.
Normally I'd write:
本当に"クール" - しかし、複雑な恐ろしい - 部分は、シンボリック範囲パラメータを可能にするために、依存する型を使用することです。
例えば、私は配列を持っており、その範囲内で、境界であることが保証されたインデックスを渡したいと言います。
通常、私は記述します:

```
T Get(T[] array, int index)
    requires index >= 0 && index < array.Length {
  return array[index];
}
```

Or maybe I'd use a uint to eliminate the first half of the check:
それとも私がチェックの最初の半分を排除するための uint を使用したいです:

```
T Get(T[] array, uint index)
    index < array.Length {
  return array[index];
}
```

Given range types, I can instead associate the upper bound of the number's range with the array length directly:
レンジの種類を考えると、私の代わりに、直接配列の長さと数の範囲の上限を関連付けることができます。

```
T Get(T[] array, number<0, array.Length> index) {
  return array[index];
}
```

Of course, there's no guarantee the compiler will eliminate the bounds check, if you somehow trip up its alias analysis.
But we would hope that it does no worse a job with these types than with normal contracts checks.
And admittedly this approach is a more direct encoding of information in the type system.

Anyway, I still chalk this one up to a cool idea, but one that's still in the realm of "nice to have but not critical."

The "not critical" aspect is especially true thanks to slices being first class in the type system.
I'd say 66% or more of the situations where range checks were used would have been better written using slices.
I think mainly people were still getting used to having them and so they'd write the standard C# thing rather than just using a slice.
I'll cover slices in an upcoming post, but they removed the need for writing range checks altogether in most code.
もちろん、あなたが何らかの形でそのエイリアス解析をつまずか場合、コンパイラは、境界チェックを排除するという保証はありません。
しかし、我々は、それは通常の契約のチェックをよりこれらのタイプの悪化仕事何もしないことを望んでいるだろう。
そして確かに、この方法は、型システム内の情報のより直接的な符号化です。

とにかく、私はまだクールなアイディアが、の分野ではまだです 1 までこの 1 チョーク "を持っているのはいいが、重要ではありません。"

"重要ではない"の側面は、特に型システムで最初のクラスであるスライスに真のおかげです。
私は、範囲チェックを使用した状況の 66 ％以上がより良いスライスを使って書かれていたであろうと思います。
私は主に、人々はまだそれらを持つことに慣れたと思うので、彼らは、標準的な C# のことを書きたいだけではなくスライスを使用して。
私は今後の記事でスライスをカバーしますが、彼らはほとんどのコードに完全に範囲チェックを記述するための必要性を除去しました。


## Recoverable Errors: Type-Directed Exceptions

Abandonment isn't the only story, of course.
There are still plenty of legitimate situations where an error the programmer can reasonably recover from occurs.
Examples include:
中断はもちろん、唯一の話ではありません。
プログラマが合理的から回復することができ、エラーが発生した正当な状況がたくさん残っています。
例としては、

- File I/O.
- Network I/O.
- Parsing data (e.g., a compiler parser).
- Validating user data (e.g., a web form submission).
- ファイル I / O 。
- ネットワーク I / O 。
- 解析データ(例えば、コンパイラのパーサー)。
- 検証のユーザデータ(例えば、 Web フォームの提出)。

In each of these cases, you usually don't want to trigger abandonment upon encountering a problem.
Instead, the program expects it to occur from time to time, and needs to deal with it by doing something reasonable.
Often by communicating it to someone: the user typing into a webpage, the administrator of the system, the developer using a tool, etc.
Of course, abandonment is one method call away if that's the most appropriate action to take, but it's often too drastic for these situations.
And, especially for IO, it runs the risk of making the system very brittle.
Imagine if the program you're using decided to wink out of existence every time your network connection dropped a packet!
これらの場合のそれぞれにおいて、あなたは、通常は問題に遭遇すると中断をトリガする必要はありません。
その代わりに、プログラムは、それが時々起こることを期待し、合理的な何かをすることによって、それに対処する必要があります。
などウェブページに入力するユーザは、システムの管理者は、ツールを使用する開発者を、:多くの場合、誰かにそれを伝えることにより、
それが取るべき最も適切な行動だが、それは多くの場合、このような状況のためにあまりにも抜本的なだ場合はもちろん、中断は、 1 のメソッド呼び出し先です。
そして、特に、 IO のために、システムが非常に脆いせる危険を冒します。
あなたが使用しているプログラムが存在の外にネットワーク接続がパケットをドロップするたびにウインクすることを決定した場合は想像してみてください。

## Enter Exceptions

We used exceptions for recoverable errors.
Not the unchecked kind, and not quite the Java checked kind, either.

First thing's first: although Midori had exceptions, a method that wasn't annotated as throws could never throw one.
Never ever ever.
There were no sneaky RuntimeExceptions like in Java, for instance.
We didn't need them anyway, because the same situations Java used runtime exceptions for were instead using abandonment in Midori.

This led to a magical property of the result system.
90-something% of the functions in our system could not throw exceptions! By default, in fact, they could not.
This was a stark contrast to systems like C++ where you must go out of your way to abstain from exceptions and state that fact using noexcept.
APIs could still fail due to abandonment, of course, but only when callers fail meet the stated contract, similar to passing an argument of the wrong type.

Our choice of exceptions was controversial at the outset.
We had a mixture of imperative, procedural, object oriented, and functional language perspective on the team.
The C programmers wanted to use error codes and were worried we would recreate the Java, or worse, C# design.
The functional perspective would be to use dataflow for all errors, but exceptions were very control-flow-oriented.
In the end, I think what we chose was a nice compromise between all of the available recoverable error models available to us.
As we'll see later, we did offer a mechanism for treating errors as first class values for that rare case where a more dataflow style of programming was what the developer wanted.

Most importantly, however, we wrote a lot of code in this model, and it worked very well for us.
Even the functional language guys came around eventually.
As did the C programmers, thanks to some cues we took from return codes.

私たちは、回復可能なエラーのための例外を使用していました。
ていない未チェックの種類ではなく、かなり Java はどちらか、種類を確認しました。

まず最初の最初: Midori の例外を持っていたものの、スローとして注釈されなかったメソッドが 1 を投げることができませんでした。
決して、これまで。
Java でのような全く卑劣な RuntimeExceptions は、例えば、ありませんでした。
同じような状況は、 Java ではなく、 Midori に中断を使用していたために実行時例外を使用するので、私たちは、とにかくそれらを必要としませんでした。

これは、結果システムの魔法のプロパティにつながりました。
我々のシステムで機能の 90 代の％は、例外をスローすることができませんでした！デフォルトでは、実際に、彼らはできませんでした。
これは、 noexcept を使用して例外と状態、その事実を控えるためにあなたの道を行かなければならない C++ のようなシステムとは対照的でした。
API はまだもちろん、中断による失敗する可能性がありますが、発信者は、間違った型の引数を渡すに似述べ契約を満たす失敗したときのみ。

例外の私たちの選択は、冒頭で物議ました。
私たちは不可欠、手続き型、オブジェクト指向、そしてチームの関数型言語の視点の混合物を持っていました。
C プログラマは、エラーコードを使用したいと我々は、 Java を再作成するだろう心配していた、または悪化し、 C# のデザイン。
機能的な観点は、すべてのエラーのためのデータフローを使用することであろうが、例外は非常に制御フロー指向しました。
最後に、私たちは私たちに利用できる利用可能な回復可能なエラーモデルのすべての間で素敵な妥協だっ選んだと思います。
我々は後で見るように、私たちはプログラミングのより多くのデータフロースタイルは、開発者が望んでいたそのまれなケースのためのファーストクラスの値としてエラーを処理するためのメカニズムを提供しました。

しかし、最も重要なことは、我々はこのモデルでコードの多くを書いて、それが私たちのために非常によく働きました。
でも関数型言語の人たちは、最終的に周りに来ました。
C プログラマを行ったように、いくつかの手がかりのおかげで、我々はリターンコードから取りました。

## Language and Type System

At some point, I made a controversial observation and decision.
Just as you wouldn't change a function's return type with the expectation of zero compatibility impact, you should not be changing a function's exception type with such an expectation.
In other words, an exception, as with error codes, is just a different kind of return value!

This has been one of the parroted arguments against checked exceptions.
My answer may sound trite, but it's simple: too bad.
You're in a statically typed programming language, and the dynamic nature of exceptions is precisely the reason they suck.
We sought to address these very problems, so therefore we embraced it, embellished strong typing, and never looked back.
This alone helped to bridge the gap between error codes and exceptions.

Exceptions thrown by a function became part of its signature, just as parameters and return values are.
Remember, due to the rare nature of exceptions compared to abandonment, this wasn't as painful as you might think.
And a lot of intuitive properties flowed naturally from this decision.

The first thing is the Liskov substitution principle.
In order to avoid the mess that C++ found itself in, all "checking" has to happen statically, at compile time.
As a result, all of those performance problems mentioned in the WG21 paper were not problems for us.
This type system must be bulletproof, however, with no backdoors to defeat it.
Because we needed to address those performance challenges by depending on throws annotations in our optimizing compiler, type safety hinged on this property.

We tried many many different syntaxes.
Before we committed to changing the language, we did everything with C# attributes and static analysis.
The user experience wasn't very good and it's hard to do a real type system that way.
Furthermore, it felt too bolted on.
We experimented with approaches from the Redhawk project - what eventually became .NET Native and CoreRT - however, that approach also didn't leverage the language and relied instead on static analysis, though it shares many similar principles with our final solution.

The basic gist of the final syntax was to simply state a method throws as a single bit:
いくつかの時点で、私は論争の観察と決定しました。
あなたがゼロ互換性への影響の期待と、関数の戻り値の型を変更しないのと同じように、あなたはそのような期待を持つ関数の例外タイプを変更すべきではありません。
言い換えれば、例外は、エラーコードと同様に、戻り値のちょうど別の種類です！

これは、チェック例外に対する parroted 引数の一つとなっています。
私の答えは陳腐に聞こえるかもしれないが、それは簡単です:あまりにも悪いです。
あなたは静的に型付けされたプログラミング言語にしている、と例外の動的な性質は、正確に、彼らは吸う理由です。
私たちは、これらの非常に問題に対処しようとしたので、したがって、我々はそれを受け入れ、強い型付けを装飾し、後ろを振り返ることはありません。
これだけで、エラーコードと例外の間のギャップを埋めるのに役立ちました。

関数によってスローされた例外は、パラメータと戻り値は同じように、その署名の一部となりました。
中断と比較して、例外のまれな性質のために、覚えておいて、これはあなたが考えるほど痛いませんでした。
そして、直感的な性質の多くは、この決定から自然に流れました。

まず最初に、リスコフの置換原則です。
C++ はコンパイル時に、静的に起こることがあり、"チェック"すべて、自分自身を中に見つかった混乱を避けるために。
その結果、 WG21 の論文に言及したパフォーマンスの問題のすべては、私たちのために問題はなかったです。
このタイプのシステムはそれを倒すためにノーバックドアで、しかし、防弾されなければなりません。
我々は最適化コンパイラに注釈をスローに依存して、これらのパフォーマンスの課題に対処するために必要なので、型の安全性は、このプロパティにヒンジ結合しました。

我々は、多くの多くの異なる構文を試してみました。
我々は言語を変更することにコミットする前に、我々は、 C# の属性と静的解析ですべてをしました。
ユーザーエクスペリエンスは非常に良好ではなかった、それはそのように実際の型システムを行うのは難しいです。
さらに、それはあまりにも上のボルトで固定感じました。
私たちは、レッドホークプロジェクトからのアプローチで実験 - 最終的には、.NET ネイティブと CoreRT なったもの - それが私たちの最終的なソリューションで多くの同様の原理を共有するものの、しかし、そのアプローチは、言語を活用していなかったと静的解析に代わりに依存していました。

最終的な構文の基本的な骨子は、単に方法は、単一のビットとしてスロー状態になりました:

```
void Foo() throws {
  ...
}
```

(For many years, we actually put the throws at the beginning of the method, but that read wrong.)
(何年もの間、私たちは実際に入れメソッドの開始時にスローされますが、それは間違って読んでください。)

At this point, the issue of substitutability is quite simple.
A throws function cannot take the place of a non- throws function (illegal strengthening).
A non-throws function, on the other hand, can take the place of a throws function (legal weakening).
This obviously impacts virtual overrides, interface implementation, and lambdas.
この時点で、代替の問題は非常に簡単です。
機能(不正強化)をスロー機能が非の場所を取ることはできませんがスローされます。
関数が非スロー、一方で、スロー機能(法的弱体化)の場所を取ることができます。
これは明らかに影響仮想オーバーライド、インタフェースの実装、およびラムダを。

Of course, we did the expected co- and contravariance substitution bells and whistles.
For example, if Foo were virtual and you overrode it but didn't throw exceptions, you didn't need to state the throws contract.
Anybody invoking such a function virtually, of course, couldn't leverage this but direct calls could.

For example, this is legal:
もちろん、我々は期待コと反変性置換添えものをしました。
たとえば、 foo が仮想たとすれば、あなたはそれを上書きしますが、例外をスローしませんでした、あなたが契約をスロー状態にする必要はありませんでした。
事実上、このような関数を呼び出す誰もが、もちろん、これを活用することができませんでしたが、直接の呼び出しができました。

たとえば、これは有効です。

```
class Base {
  public virtual void Foo() throws {...}
}

class Derived : Base {
  // My particular implementation doesn't need to throw:
  public override void Foo() {...}
}
```

and callers of Derived could leverage the lack of throws; whereas this is wholly illegal:
そして、派生の発信者は、スローの欠如を活用することができ;これは完全に違法であるのに対し:

```
class Base {
  public virtual void Foo () {...}
}

class Derived : Base {
  public override void Foo() throws {...}
}
```

Encouraging a single failure mode was quite liberating.
A vast amount of the complexity that comes with Java's checked exceptions evaporated immediately.
If you look at most APIs that fail, they have a single failure mode anyway (once all bug failure modes are done with abandonment): IO failed, parsing failed, etc.
And many recovery actions a developer tends to write don't actually depend on the specifics of what exactly failed when, say, doing an IO.
(Some do, and for those, the keeper pattern is often the better answer; more on this topic shortly.) Most of the information in modern exceptions are not actually there for programmatic use; instead, they are for diagnostics.
単一故障モードを奨励することは非常に解放しました。
Java のチェック例外が付属しています複雑さの膨大な量がすぐに蒸発させました。
あなたが失敗したほとんどの API を見れば、彼らは(一度すべてのバグ故障モードを中断して行われている)とにかく単一故障モードを持っている: IO は構文解析失敗したなど、失敗しました
そして、多くのリカバリーアクション開発者が実際に IO を行うときに、たとえば、正確に失敗したかの仕様に依存しない書き込みする傾向があります。
(一部を行う、およびそれらのために、キーパーのパターンは、多くの場合、より良い答えです。まもなくこのトピックの詳細。)現代の例外の情報のほとんどは、プログラム使用のためにそこに実際にはありません。その代わりに、彼らは、診断のためのものです。

We stuck with just this "single failure mode" for 2-3 years.
Eventually I made the controversial decision to support multiple failure modes.
It wasn't common, but the request popped up reasonably often from teammates, and the scenarios seemed legitimate and useful.
It did come at the expense of type system complexity, but only in all the usual subtyping ways.
And more sophisticated scenarios - like aborts (more on that later) - required that we do this.
私たちは、 2 〜 3 年のためだけに、この"単一故障モード"で立ち往生。
結局私は、複数の故障モードをサポートするための論争の決定をしました。
これは一般的ではありませんでしたが、要求はチームメイトから合理的に頻繁にポップアップ、およびシナリオは、正当かつ有用と思われました。
これは、だけすべての通常のサブタイプの方法で、型システムの複雑さを犠牲にして来ました。
そして、もっと洗練されたシナリオ - (詳細は後述)アボートなどは - 私たちはこれを行うことが必要。

The syntax looked like this:
構文はこのようになりました。

```
int Foo() throws FooException, BarException {
  ...
}
```

In a sense, then, the single throws was a shortcut for throws Exception.
ある意味では、その後、単一の例外をスローするためのショートカットだったがスローされます。

It was very easy to "forget" the extra detail if you didn't care.
For example, perhaps you wanted to bind a lambda to the above Foo API, but didn't want callers to care about FooException or BarException.
That lambda must be marked throws, of course, but no more detail was necessary.
This turned out to be a very common pattern: An internal system would use typed exceptions like this for internal control flow and error handling, but translate all of them into just plain throws at the public boundary of the API, where the extra detail wasn't required.
あなたが気にしませんでした場合は、余分なディテールを"忘れる"ことは非常に簡単でした。
たとえば、おそらくあなたは、上記の Foo API にラムダをバインドしたかったが、発信者が FooException または BarException を気にしたくありませんでした。
つまり、ラムダはもちろん、スローマークされますが、これ以上の詳細は必要ではなかったしなければなりません。
内部システムは、内部の制御フローとエラー処理のためにこのような型付きの例外を使用していますが、ただの余分な詳細は、"wasn API の公共境界でスローにそれらのすべてを翻訳するでしょう:これは非常に一般的なパターンであることが判明しましたトンが必要。

All of this extra typing added great power to recoverable errors.
But if contracts outnumbered exceptions by 10:1, then simple throws exceptional methods outnumbered multi-failure-mode ones by another 10:1.

At this point, you may be wondering, what differentiated this from Java's checked exceptions?

The fact that the lion's share of errors were expressed using abandonment meant most APIs didn't throw.

The fact that we encouraged a single mode of failure simplified the entire system greatly.
Moreover, we made it easy to go from the world of multiple modes, to just a single and back again.

The rich type system support around weakening and strengthening also helped, as did something else we did to that helped bridge the gap between return codes and exceptions, improved code maintainability, and more …
この余分なタイピングのすべてが回復可能なエラーに大きな力を追加しました。
契約は 10 で例外を上回った場合でも: 1 、単純な例外的な方法は、別の 10 による多重障害モードのものを上回っスロー: 1 。

この時点で、あなたは Java のチェック例外からこれを区別するもの、疑問に思うかもしれ？

エラーのライオンのシェアは中断を用いて表現されたという事実は、ほとんどの API はスローされませんでした意味しました。

我々は、単一の障害モードを奨励しているという事実は、大幅にシステム全体を簡素化。
さらに、我々はそれが簡単に再び 1 つだけとし、複数のモードの世界から行くことになりました。

我々はリターンコードと例外、改良されたコードの保守性、およびより多くの間のギャップを埋める助けすることでした何か他のものをしたとして弱体化と強化の周りの豊かな型システムのサポートも、助けました...

## Easily Auditable Callsites

At this point in the story, we still haven't achieved the full explicit syntax of error codes.
The declarations of functions say whether they can fail (good), but callers of those functions still inherit silent control flow (bad).

This brings about something I always loved about our exceptions model.
A callsite needs to say try:
物語の中でこの時点で、我々はまだエラーコードの完全な明示的な構文を達成していません。
関数の宣言は、彼らが(良い)を失敗することができますが、これらの関数の呼び出し元がまだサイレント制御フロー(悪い)を継承するかどうかを言います。

これは私が常に我々の例外モデルについて愛した何かをもたらします。
呼び出し場所は試して言う必要があります:

```
int value = try Foo();
```

This invokes the function Foo, propagates its error if one occurs, and assigns the return value to value otherwise.

This has a wonderful property: all control flow remains explicit in the program.
You can think of try as a kind of conditional return (or conditional throw if you prefer).
I freaking loved how much easier this made code reviewing error logic! For example, imagine a long function with a few trys inside of it; having the explicit annotation made the points of failure, and therefore control flow, as easy to pick out as return statements:
これは、関数 foo を呼び出す 1 が発生した場合、そのエラーを伝播し、そうでない場合は評価に戻り値を割り当てます。

これは素晴らしい性質を有している:すべての制御フローがプログラムで明示的に残っています。
(ご希望の場合は、条件付き投)あなたは条件付きリターンの一種として試して考えることができます。
私は、これはコードレビューするエラーロジックを作った方法はるかに容易に愛さおかしくなり！例えば、その中の数 trys と長い関数を想像。明示的なアノテーションを持つことは、障害のポイントを作ったので、 return 文として選び出すように簡単、流れを制御します。

```
void doSomething() throws {
  blah();
  var x = blah_blah(blah());
  var y = try blah(); // <-- ah, hah! something that can fail!
  blahdiblahdiblahdiblahdi();
  blahblahblahblah(try blahblah()); // <-- another one!
  and_so_on(...);
}
```

If you have syntax highlighting in your editor, so the trys are bold and blue, it's even better.

This delivered many of the strong benefits of return codes, but without all the baggage.
あなたのエディタで構文ハイライトを持っているので、 trys は太字と青であれば、それも良いでしょう。

これは、戻りコードの強力な利点の多くをもたらしますが、すべての手荷物なし。

(Both Rust and Swift now support a similar syntax.
I have to admit I'm sad we didn't ship this to the general public years ago.
Their implementations are very different, however consider this a huge vote of confidence in their syntax.)
( Rust と Swift の両方が、今似た構文をサポートしています。
私は、私たちが一般の人々年前にこれを出荷しませんでした悲しい認めざるを得ません。
その実装は、しかし、その構文に自信のこの巨大な投票を検討し、非常に異なっています。)

Of course, if you are trying a function that throws like this, there are two possibilities:
あなたはこのようなスロー機能をしようとしている場合はもちろん、 2 つの可能性があります。

- The exception escapes the calling function.
- There is a surrounding try/catch block that handles the error.
- 例外は、呼び出し元の関数をエスケープします。
- エラーを処理する周囲の try / catch ブロックがあります。


In the first case, you are required to declare that your function throws too.
It is up to you whether to propagate strong typing information should the callee declare it, or simply leverage the single throws bit, of course.

In the second case, we of course understood all the typing information.
As a result, if you tried to catch something that wasn't declared as being thrown, we could give you an error about dead code.
This was yet another controversial departure from classical exceptions systems.
It always bugged me that catch (FooException) is essentially hiding a dynamic type test.
Would you silently permit someone to call an API that returns just object and automatically assign that returned value to a typed variable? Hell no! So we didn't let you do that with exceptions either.

Here too CLU influenced us.
Liskov talks about this in A History of CLU:
最初のケースでは、あなたの関数があまりにもスローすることを宣言する必要があります。
これは、呼び出される側がそれを宣言するか、または単にシングルはもちろん、少しスロー活用すべきである強い型付け情報を伝播するかどうかまでです。

第二のケースでは、我々は、もちろん、すべての入力情報を理解しました。
あなたがスローされるように宣言されていない何かをキャッチしようとした場合、結果として、我々はあなたにデッドコードに関するエラーを与えることができます。
これはまだ古典的な例外システムから別の論争の出発でした。
それは、常にキャッチ( FooException )は、本質的にダイナミック型テストを隠していることを私に盗聴しました。
あなたは黙ってただオブジェクトと自動的に入力された変数にその戻り値を割り当てる返す API を呼び出すために誰かを許可しますか？地獄！だから我々はあなたがいずれかの例外を除いてそれを行うことはできませんでした。

ここでも CLU は私たちに影響を与えました。
CLU の歴史でこのことについてリスコフ会談:

> CLU's mechanism is unusual in its treatment of unhandled exceptions.
Most mechanisms pass these through: if the caller does not handle an exception raised by a called procedure, the exception is propagated to its caller, and so on.
We rejected this approach because it did not fit our ideas about modular program construction.
We wanted to be able to call a procedure knowing just its specification, not its implementation.
However, if exceptions are propagated automatically, a procedure may raise an exception not described in its specification.
> CLU のメカニズムは未処理の例外のその治療に珍しいです。
ほとんどのメカニズムは介してこれらのを渡す:呼び出し元はと呼ばれる手順によって発生した例外を処理しない場合、例外がというようにその呼び出し元に伝播され、。
それはモジュラープログラム構築に関する当社の考え方に適合していなかったので、我々はこのアプローチを棄却しました。
私達はちょうどその仕様ではなく、その実装を知ってプロシージャを呼び出すことができるようにしたかったです。
例外は自動的に伝播されている場合は、手順は、その仕様に記述されていない例外を発生することがあります。

Although we discouraged wide try blocks, this was conceptually a shortcut for propagating an error code.
To see what I mean, consider what you'd do in a system with error codes.
In Go, you might say the following:
我々は広いの try ブロックをお勧めしますが、これは概念的にエラーコードを伝播するための近道でした。
私が何を意味するかを確認するには、あなたがエラーコードを持つシステムで実行したいかを考え。
 Go では、次のことを言うかもしれません:


```
if err := doSomething(); err != nil {
  return err
}
```

In our system, you say:
我々のシステムでは、あなたが言います:

```
try doSomething();
```

But we used exceptions, you might say! It's completely different! Sure, the runtime systems differ.
But from a language "semantics" perspective, they are isomorphic.
We encouraged people to think in terms of error codes and not the exceptions they knew and loved.
This might seem funny: Why not just use return codes, you might wonder? In an upcoming section, I will describe the true isomorphism of the situation to try to convince you of our choice.
しかし、我々は例外を使用し、あなたは言うかもしれません！それは完全に違います！確かに、ランタイムシステムが異なります。
しかし、言語の"意味論"の観点から、彼らは同型です。
私たちは、エラーコードではなく、彼らは知っていた、愛さ例外の観点で考えるように人々を奨励しました。
これは、面白いように見えるかもしれません:なぜあなたは不思議に思うかもしれません、リターンコードを使わないのでしょうか？今後のセクションでは、私は我々の選択のあなたを説得しようとする状況の真の同型を説明します。

### Syntactic Sugar

We also offered some syntactic sugar for dealing with errors.
The try/catch block scoping construct is a bit verbose, especially if you're following our intended best practices of handling errors as locally as possible.
It also still retains a bit of that unfortunate goto feel for some, especially if you are thinking in terms of return codes.
That gave way to a type we called Result<T>, which was simply either a T value or an Exception.

This essentially bridged from the world of control-flow to the world of dataflow, for scenarios in which the latter was more natural.
Both certainly had their place, although most developers preferred the familiar control flow syntax.

To illustrate common usage, imagine you want to log all errors that occur, before repropagating the exception.
Though this is a common pattern, using try/catch blocks feels a little too control flow heavy for my taste:
また、エラーに対処するためのいくつかの構文糖を提供しました。
try / catch ブロックスコープコンストラクトは、ローカルにできるだけエラー処理の我々の意図のベストプラクティスに従っている場合は特に、少し冗長です。
また、まだあなたがリターンコードの観点で考えている場合は特に、いくつかのためにその不幸な後藤感のビットを保持します。
それは単に T 値または例外のいずれかであった私たちは結果<T>と呼ばれるタイプ、に道を譲りました。

これは、基本的に後者の方がより自然であったシナリオのために、データフローの世界に制御フローの世界からブリッジさ。
ほとんどの開発者は使い慣れた制御フロー構文が好ましいが、両方のは、確かに、その場所を持っていました。

一般的な使用法を説明するために、あなたは例外を repropagating 前に、発生するすべてのエラーを記録したい想像してみてください。
これは try / catch ブロックを使用して一般的なパターンは、ですが少しはあまりにも私の好みのための重い流れを制御感じています:

```
int v;
try {
  v = try Foo();
  // Maybe some more stuff...
}
catch (Exception e) {
  Log(e);
  rethrow;
}
// Use the value `v`...
```

The "maybe some more stuff" bit entices you to squeeze more than you should into the try block.
Compare this to using `Result<T>`, leading to a more return-code feel and more convenient local handling:
"おそらくいくつかのより多くのもの"ビットが try ブロックの中にあなたが必要以上に多くを圧迫するあなたを誘惑します。
`の検索結果を使用してこれを比較し、<T>`、より多くのリターンコードにつながるが感じ、より便利にローカル処理:

```
Result<int> value = try Foo() else catch;
if (value.IsFailure) {
  Log(value.Exception);
  throw value.Exception;
}
// Use the value `value.Value`...
```

The try ... else construct also permitted you to substitute your own value instead, or even trigger abandonment, in response to failure:
トライ... else 構造はまた、障害に応じて、代わりに独自の値を代入し、あるいは中断をトリガすることを許可しました:

```
int value1 = try Foo() else 42;
int value2 = try Foo() else Release.Fail();
```

We also supported NaN-style propagation of dataflow errors by lifting access to Ts members out of the `Result<T>`.
For example, let's say I have two `Result<int>`s and want to add them together.
I can do so:
また、 `結果<T>`のうち、 Ts のメンバーへのアクセスを持ち上げて、データフローのエラーの NaN のスタイルの伝播をサポートしていました。
たとえば、のは、私は 2 つの `結果<整数>` s のを持っているし、それらを追加したいとしましょう。
私はそうすることができます。

```
Result<int> x = ...;
Result<int> y = ...;
Result<int> z = x + y;
```

Notice that third line, where we added the two `Result<int>`s together, yielding a - that's right - third `Result<T>`.
This is the NaN-style dataflow propagation, similar to C# 's new .? feature.

This approach blends what I found to be an elegant mixture of exceptions, return codes, and dataflow error propagation.
そうです - - 第三 `結果<T>`降伏、私たちは<整数> 2 `の検索結果を追加 3 行目は、`一緒だということに注意してください。
これは、 C# の新しいと類似の NaN スタイルのデータフローの伝播、ですか。？特徴。

このアプローチは、私は例外、リターンコード、およびデータフローの誤差伝播のエレガントな混合物であることが判明何ブレンド。

## Implementation

The model I just described doesn't have to be implemented with exceptions.
It's abstract enough to be reasonably implemented using either exceptions or return codes.
This isn't theoretical.
We actually tried it.
And this is what led us to choose exceptions instead of return codes for performance reasons.

To illustrate how the return code implementation might work, imagine some simple transformations:
私は説明したモデルは例外で実装する必要はありません。
それは合理的に例外やリターンコードのいずれかを使用して実装されるのに十分抽象的です。
これは理論的ではありません。
私たちは実際にそれを試してみました。
そして、これはパフォーマンス上の理由から、例外の代わりに、リターンコードを選択するために私達を導いたものです。

リターンコードの実装がうまくいくかもしれない方法を説明するために、いくつかの単純な変換を想像してみてください。

```
int foo() throws {
  if (...p...) {
    throw new Exception();
  }
  return 42;
}
```

becomes:

```
Result<int> foo() {
  if (...p...) {
    return new Result<int>(new Exception());
  }
  return new Result<int>(42);
}
```

And code like this:

```
int x = try foo();
```

becomes something more like this:

```
int x;
Result<int> tmp = foo();
if (tmp.Failed) {
  throw tmp.Exception;
}
x = tmp.Value;
```

An optimizing compiler can represent this more efficiently, eliminating excessive copying.
Especially with inlining.

If you try to model try/catch/finally this same way, probably using goto, you'll quickly see why compilers have a hard time optimizing in the presence of unchecked exceptions.
All those hidden control flow edges!

Either way, this exercise very vividly demonstrates the drawbacks of return codes.
All that goop - which is meant to be rarely needed (assuming, of course, that failure is rare) - is on hot paths, mucking with your program's golden path performance.
This violates one of our most important principles.

I described the results of our dual mode experiment in my last post.
In summary, the exceptions approach was 7% smaller and 4% faster as a geomean across our key benchmarks, thanks to a few things:
最適化コンパイラは、過剰なコピーを排除し、より効率的にこれを表すことができます。
特にインライン化しています。

あなたは/キャッチ/最後にこれと同じ方法を試してモデル化しようとするとコンパイラが非チェック例外の存在下での最適化、ハードの時間を持っている理由、おそらく goto 文使用して、あなたはすぐに表示されます。
これらすべての隠された制御フローエッジ！

いずれにしても、この演習は非常に生き生きとリターンコードの欠点を示しています。
すべてのその無神経な人 - ほとんど必要ありませんされることになって(もちろん、その障害はまれである、と仮定)は - あなたのプログラムの黄金のパス性能でいじくる、ホットパス上にあります。
これが私たちの最も重要な原則の一つに違反します。

私は私の最後のポストで私たちのデュアルモード実験の結果を説明しました。
要約すると、例外のアプローチは、私たちの主要なベンチマーク全体の幾何平均としていくつかのおかげで 7 ％より小さく、 4 ％速かったです。

- No calling convention impact.
- No peanut butter associated with wrapping return values and caller branching.
- All throwing functions were known in the type system, enabling more flexible code motion.
- All throwing functions were known in the type system, giving us novel EH optimizations, like turning try/finally blocks into straightline code when the try could not throw.
- いいえ、呼び出し規約への影響。
- ラッピング戻り値と呼び出し元の分岐に関連付けられませんピーナッツバター。
- すべての投げの機能は、より柔軟なコード移動を可能にする、型システムで知られていました。
- すべての投げ機能を試しては投げることができなかったときに定額コードにの try / finally ブロックを回すように、私たちに新たな EH の最適化を与え、型システムで知られていました。

There were other aspects of exceptions that helped with performance.
I already mentioned that we didn't grovel the callstack gathering up metadata as most exceptions systems do.
We left diagnostics to our diagnostics subsystem.
Another common pattern that helped, however, was to cache exceptions as frozen objects, so that each throw didn't require an allocation:
パフォーマンスを手伝ってくれました例外の他の側面がありました。
私はすでに、ほとんど例外システムがそうであるように、我々は、メタデータを収集するコールスタックを屈服しなかったことを述べました。
私たちは、診断サブシステムに診断を残しました。
しかし、各投割り当てを必要としないように、凍結されたオブジェクトとしての例外をキャッシュすることであった、助けたもう一つの一般的なパターン:

```
const Exception retryLayout = new Exception();
...
throw retryLayout;
```

For systems with high rates of throwing and catching - as in our parser, FRP UI framework, and other areas - this was important to good performance.
And this demonstrates why we couldn't simply take "exceptions are slow" as a given.
私たちのパーサ、 FRP の UI フレームワーク、および他の分野のように - - 投げるとキャッチ率の高いシステムでは、これは良好な性能に重要でした。
我々は、単に与えられたとして、"例外がスローされている"取ることができなかった理由は、これは示しています。

## Patterns

A number of useful patterns came up that we embellished in our language and libraries.
有用なパターンの数は、我々の言語とライブラリに装飾することを思いつきました。

## Concurrency

Back in 2007, I wrote this note about concurrency and exceptions.
I wrote it mainly from the perspective of parallel, shared memory computations, however similar challenges exist in all concurrent orchestration patterns.
The basic issue is that the way exceptions are implemented assumes single, sequential stacks, with single failure modes.
In a concurrent system, you have many stacks and many failure modes, where 0, 1, or many may happen "at once."

A simple improvement that Midori made was simply ensuring all Exception-related infrastructure handled cases with multiple inner errors.
At least then a programmer wasn't forced to decide to toss away 1/N'th of the failure information, as most exceptions systems encourage today.
More than that, however, our scheduling and stack crawling infrastructure fundamentally knew about cactus-style stacks, thanks to our asynchronous model, and what to do with them.

At first, we didn't support exceptions across asynchronous boundaries.
Eventually, however, we extended the ability to declare throws, along with optional typed exceptions clauses, across asynchronous process boundaries.
This brought a rich, typed programming model to the asynchronous actors programming model and felt like a natural extension.
This borrowed a page from CLU's successor, Argus.

Our diagnostics infrastructure embellished this to give developers debugging experiences with full-blown cross-process causality in their stack views.
Not only are stacks cactuses in a highly concurrent system, but they are often smeared across process message passing boundaries.
Being able to debug the system this way was a big time-saver.
戻る 2007 年に、私は、同時実行性と例外に関するこのノートを書きました。
しかし私は、同様の課題がすべての同時オーケストレーションパターンに存在し、パラレル、共有メモリ計算の観点から、主にそれを書きました。
基本的な問題は、例外が実装されている方法は、単一故障モードで、シングル、シーケンシャルスタックを前提としていることです。
並行システムでは、あなたは 0 、 1 、または多くが起こる可能性があり、多くのスタックと多くの故障モード、持っている "一度に。"

Midori が作った簡単な改善は、単に複数の内部エラーが発生したすべての例外関連のインフラ扱う例を確保しました。
その後、少なくともプログラマはほとんど例外システムは、今日の奨励として、障害情報の離れた 1 / N 番目を投げることを決定することを余儀なくされていませんでした。
それ以上に、しかし、私たちのスケジューリングおよびスタッククロールインフラは基本的に、サボテンスタイルのスタックについて、当社の非同期モデルのおかげで知っていたし、それらをどうしますか。

最初に、我々は非同期の境界を越えて例外をサポートしていませんでした。
最終的に、しかし、我々は非同期プロセスの境界を越えて、任意の型指定された例外条項とともに、スロー宣言する機能を拡張しました。
これは、モデルのプログラミング非同期俳優に豊かな、型付けされたプログラミングモデルを持ってきて、自然な拡張のように感じました。
これは CLU の後継者、アーガスからページを借りました。

当社の診断インフラストラクチャは、そのスタックビューで本格的なクロスプロセスの因果関係と経験をデバッグする開発者に与えるために、これを装飾します。
スタックのサボテンは、並行性の高いシステムであるが、それらは多くの場合、プロセスメッセージパッシングの境界を越えて不鮮明にされているだけでなく。
この方法でシステムをデバッグできることは、大きな時間の節約でした。

## Aborts

Sometimes a subsystem needs to "get the hell out of Dodge." Abandonment is an option, but only in response to bugs.
And of course nobody in the process can stop it in its tracks.
What if we want to back out the callstack to some point, know that no-one on the stack is going to stop us, but then recover and keep going within the same process?

Exceptions were close to what we wanted here.
But unfortunately, code on the stack can catch an in-flight exception, thereby effectively suppressing the abort.
We wanted something unsuppressable.

Enter aborts.
We invented aborts mainly in support of our UI framework which used Functional Reactive Programming (FRP), although the pattern came up in a few spots.
As an FRP recalculation was happening, it's possible that events would enter the system, or new discoveries got made, that invalidate the current recalculation.
If that happened - typically deep within some calculation whose stack was an interleaving of user and system code - the FRP engine needed to quickly get back to top of its stack where it could safely begin a recalculation.
Thanks to all of that user code on the stack being functionally pure, aborting it mid-stream was easy.
No errant side-effects would be left behind.
And all engine code that was traversed was audited and hardened thoroughly, thanks to typed exceptions, to ensure invariants were maintained.

The abort design borrows a page from the capability playbook.
First, we introduce a base type called AbortException.
It may be used directly or subclassed.
One of these is special: nobody can catch-and-ignore it.
The exception is reraised automatically at the end of any catch block that attempts to catch it.
We say that such exceptions are undeniable.

But someone's got to catch an abort.
The whole idea is to exit a context, not tear down the entire process a la abandonment.
And here's where capabilities enter the picture.
Here's the basic shape of AbortException:
時々、サブシステムは、"ダッジの地獄を取得します。 "する必要があります中断はオプションですが、唯一のバグに対応しています。
そしてもちろん、プロセス内の誰もがそのトラックにそれを止めることはできません。
我々はいくつかのポイントにコールスタックをバックアウトしたい場合はどう、スタック上の誰が私たちを停止しようとされていないことを知っているが、その後回復し、同じプロセス内で続けますか？

例外は、我々がここで何を望むかに近かったです。
しかし残念ながら、スタック上のコードは、それによって効果的にアボートを抑制すること、飛行中の例外をキャッチすることができます。
私たちは unsuppressable 何かを望んでいました。

アボート入力します。
パターンはいくつかのスポットを思いついたが、私たちは、主に官能性反応プログラミング( FRP )を使用し、当社の UI フレームワークのサポートでアボート発明しました。
FRP の再計算が起こっていたように、現在の再計算を無効こと、それはイベントがシステムに入力している可能性があります、または新しい発見がなされました。
それが起こった場合 - すぐにそれが安全に再計算を開始することができ、そのスタックの先頭に戻って取得するために必要な FRP エンジン - そのスタックユーザーとシステムコードのインタリーブしたいくつかの計算内で一般的に深いです。
スタックは機能的に純粋であることに、そのユーザーのすべてのコードのおかげで、ミッドストリームを中断することは容易でした。
いいえ誤った副作用が取り残されないであろう。
そして、不変量を確保するために、入力された例外のおかげで監査され、徹底的に硬化させた走査したすべてのエンジンコードが維持されました。

アボートデザインは、能力脚本からページを借ります。
まず、 AbortException と呼ばれる基本型を紹介します。
これは、直接使用またはサブクラス化することができます。
これらの一つは特別です:誰もそれを無視キャッチしない - と - することができます。
例外はそれをキャッチしようとする任意の catch ブロックの終了時に自動的にリレイズされています。
私たちは、そのような例外が否定できないと言います。

しかし、誰かのアボートをキャッチするようになりました。
全体的なアイデアは、コンテキストを終了し、全体ではなくプロセスにラ中断を取り壊すことです。
機能は画像を入力する場所とここです。
ここで AbortException の基本形状は次のとおりです。


```
public immutable class AbortException : Exception {
  public AbortException(immutable object token);
  public void Reset(immutable object token);
  // Other uninteresting members omitted...
}
```

Notice that, at the time of construction, an immutable token is provided; in order to suppress the throw, Reset is called, and a matching token must be provided.
If the token doesn't match, abandonment occurs.
The idea is that the throwing and intended catching parties of an abort are usually the same, or at least in cahoots with one another, such that sharing the token securely with one another is easy to do.
This is a great example of objects as unforgeable capabilities in action.

And yes, an arbitrary piece of code on the stack can trigger an abandonment, but such code could already do that by simply dereferencing null.
This technique prohibits executing in the aborting context when it might not have been ready for it.

Other frameworks have similar patterns.
The .NET Framework has ThreadAbortException which is also undeniable unless you invoke Thread.ResetAbort; sadly, because it isn't capability-based, a clumsy combination of security annotations and hosting APIs are required to stop unintended swallowing of aborts.
More often, this goes unchecked.

Thanks to exceptions being immutable, and the token above being immutable, a common pattern was to cache these guys in static variables and use singletons.
For example:
建設時には、不変のトークンが提供され、ことに注意してください。スローを抑制するために、リセットが呼び出され、マッチングトークンが提供されなければなりません。
トークンが一致しない場合、中断が発生します。
アイデアは、互いにしっかりとトークンを共有することは行うことは容易であるように、通常は同じであるか、または少なくとも互いに共謀に投げることとアボートのパーティーを引くことを意図しています。
これはアクションで偽造不可能な機能などのオブジェクトの良い例です。

そして、はい、スタック上のコードの任意の部分は中断をトリガすることができますが、そのようなコードはすでに、単に null を参照解除することによってそれを行うことができます。
この技術は、それはそれのために準備されていない可能性がある場合中止コンテキストで実行禁止しています。

他のフレームワークは、同様のパターンを持っています。
.NET Framework は、あなたがスレッドを起動しない限り、また否定できない ThreadAbortException のを持っています。 ResetAbort;それは能力ベースではないので悲しいことに、セキュリティアノテーションとホスティングの API の不器用な組み合わせが異常終了の意図しない嚥下を停止する必要があります。
多くの場合、これは未チェックになります。

不変であること例外のおかげで、かつ不変であること上記のトークンは、一般的なパターンは、静的変数でこれらの人をキャッシュし、シングルトンを使用していました。
例えば:

```
class MyComponent {
  const object abortToken = new object();
  const AbortException abortException = new AbortException(abortToken);

  void Abort() throws AbortException {
    throw abortException;
  }

  void TopOfTheStack() {
    while (true) {
      // Do something that calls deep into some callstacks;
      // deep down it might Abort, which we catch and reset:
      let result = try ... else catch<AbortException>;
      if (result.IsFailed) {
        result.Exception.Reset(abortToken);
      }
    }
  }
}
```

This pattern made aborts very efficient.
An average FRP recalculation aborted multiple times.
Remember, FRP was the backbone of all UI in the system, so the slowness often attributed to exceptions was clearly not acceptable.
Even allocating an exception object would have been unfortunate, due to the ensuing GC pressure.
作られたこのパターンは非常に効率的に中止されます。
平均 FRP の再計算が複数回中断されました。
FRP は、システム内のすべての UI のバックボーンだったので、多くの場合、例外に起因する遅さは明らかに受け入れられない、覚えておいてください。
でも例外オブジェクトを割り当てることは、その後の GC の圧力に起因する不幸だっただろう。

## Opt-in "Try" APIs

I mentioned a number of operations that abandoned upon failure.
That included allocating memory, performing arithmetic operations that overflowed or divided-by-zero, etc.
In a few of these instances, a fraction of the uses are appropriate for dynamic error propagation and recovery, rather than abandonment.
Even if abandonment is better in the common case.

This turned out to be a pattern.
Not terribly common, but it came up.
As a result, we had a whole set of arithmetic APIs that used a dataflow-style of propagation should overflow, NaN, or any number of things happen.

I also already mentioned a concrete instance of this earlier, which is the ability to try new an allocation, when OOM yields a recoverable error rather than abandonment.
This was super uncommon, but could crop up if you wanted to, say, allocate a large buffer for some multimedia operation.
私は失敗したときに中断された操作の数を述べました。
つまり等、オーバーフローまたは分割ゼロによる演算を行うことにより、メモリの割り当てに含ま
これらのインスタンスの数では、用途の割合はむしろ中断より、動的エラー伝播と回復のために適切です。
中断は、一般的な場合には優れている場合でも。

これはパターンであることが判明しました。
ひどく一般的ではありませんが、それが上がってきました。
その結果、我々は、 NaN のをオーバーフロー、または物事の任意の数が起こるはず伝播のデータフロースタイルを使用する算術の API のセット全体を持っていました。

OOM が中断ではなく、回復可能なエラーを生成するとき、私はすでに、新しい割り当てをしようとする能力である、この以前の具体的なインスタンスを述べました。
これは超珍しいだったが、あなたは、たとえば、いくつかのマルチメディア操作に大きなバッファを割り当てるしたい場合は、最大切り抜くことができます。

## Keepers

The last pattern I'll cover is called the keeper pattern.

In a lot of ways, the way recoverable exceptions are handled is "inside out." A bunch of code is called, passing arguments down the callstack, until finally some code is reached that deems that state unacceptable.
In the exceptions model, control flow is then propagated back up the callstack, unwinding it, until some code is found that handles the error.
At that point if the operation is to be retried, the sequence of calls must be reissued, etc.

An alternative pattern is to use a keeper.
The keeper is an object that understands how to recover from errors "in situ," so that the callstack needn't be unwound.
Instead, the code that would have otherwise thrown an exception consults the keeper, who instructs the code how to proceed.
A nice aspect of keepers is that often, when done as a configured capability, surrounding code doesn't even need to know they exist - unlike exceptions which, in our system, had to be declared as part of the type system.
Another aspect of keepers is that they are simple and cheap.

Keepers in Midori could be used for prompt operations, but more often spanned asynchronous boundaries.

The canonical example of a keeper is one guarding filesystem operations.
Accessing files and directories on a file system typically has failure modes such as:
私が取り上げる最後のパターンはキーパーのパターンと呼ばれています。

多くの点では、回復可能な例外が処理される方法は、"裏返し"です。最終的にいくつかのコードは、その状態が許容できないと判断し、その到達するまでコードの束は、コールスタックダウン引数を渡す、と呼ばれています。
いくつかのコードがエラーを処理すること見つかるまで、例外モデルでは、制御フローは、その後、それを巻き戻す、コールスタックをバックアップ伝播されます。
操作を再試行する場合にはその時点で、呼び出しのシーケンスは、等を再発行する必要があります

代替パターンがキーパーを使用することです。
キーパーは、コールスタックが巻き戻される必要がないように"、その場で"エラーから回復する方法を理解するオブジェクトです。
その代わりに、それ以外の場合は例外がスローされたであろうコードを続行するにはどのようにコードを指示キーパーを調べます。
我々のシステムでは、型システムの一部として宣言されなければならなかった、例外とは異なり - キーパーの素敵な側面は、設定された機能として行われたとき、多くの場合、周囲のコードがあっても、彼らが存在を知っている必要がないことです。
キーパーの別の態様は、それらが簡単で安価であることです。

Midori 中のキーパーは、プロンプトの操作のために使用されるが、より頻繁に非同期の境界をスパンすることができました。

キーパーの標準的な例は、ファイルシステム操作を守って 1 です。
ファイルシステム上のファイルやディレクトリへのアクセス、一般的のような故障モードを持っています。

- Invalid path specification.
- File not found.
- Directory not found.
- File in use.
- Insufficient privileges.
- Media full.
- Media write-protected.
- 無効なパス指定。
- ファイルが見つかりません。
- ディレクトリが見つかりません。
- 使用中のファイル。
- 権限が不十分です。
- フルメディア。
- メディア書き込み保護。

One option is to annotate each filesystem API with a throws clause for each.
Or, like Java, to create an IOException hierarchy with each of these as subclasses.
An alternative is to use a keeper.
This ensures the overall application doesn't need to know or care about IO errors, permitting recovery logic to be centralized.
Such a keeper interface might look like this:
1 つのオプションは、それぞれに throws 節で、各ファイルシステム API に注釈を付けることです。
または、 Java のような、サブクラスとしてこれらのそれぞれとの IOException 階層を作成します。
代替案は、キーパーを使用することです。
これは、アプリケーション全体を集中管理する回復ロジックを可能にして、 IO エラーについて知っているかを気にする必要はありませんが保証されます。
このようなキーパーインタフェースは、次のようになります。

```
async interface IFileSystemKeeper {
  async string InvalidPathSpecification(string path) throws;
  async string FileNotFound(string path) throws;
  async string DirectoryNotFound(string path) throws;
  async string FileInUse(string path) throws;
  async Credentials InsufficientPrivileges(Credentials creds, string path) throws;
  async string MediaFull(string path) throws;
  async string MediaWriteProtected(string path) throws;
}
```

The idea is that, in each case, the relevant inputs are provided to the keeper when failure occurs.
The keeper is then permitted to perform an operation, possibly asynchronous, to recover.
In many cases, the keeper can optionally return updated arguments for the operation.
For example, InsufficientPrivileges could return alternative Credentials to use.
(Maybe the program prompted the user and she switched to an account with write access.) In each case shown, the keeper could throw an exception if it didn't want to handle the error, although this part of the pattern was optional.

Finally, I should note that Windows's Structured Exception Handling (SEH) system supports "continuable" exceptions which are conceptually attempting to achieve this same thing.
They let some code decide how to restart the faulting computation.
Unfortunately, they're done using ambient handlers on the callstack, rather than first class objects in the language, and so are far less elegant - and significantly more error prone - than the keepers pattern.
アイデアは、障害が発生した場合、それぞれの場合において、関連する入力がキーパーに提供される、ということです。
キーパーは、その後回復するために、非同期の可能性、操作の実行を許可されています。
多くの場合、ゴールキーパーは、必要に応じて、操作のための更新された引数を返すことができます。
例えば、 InsufficientPrivileges は、使用する代替の資格情報を返すことができます。
(たぶんプログラムは、ユーザを促し、彼女は書き込みアクセス権を持つアカウントに切り替えました。)パターンのこの部分はオプションでしたが、それは、エラーを処理したくなかった場合に示される各ケースで、キーパーが例外をスローする可能性があります。

最後に、私は( SEH )システムの処理の Windows の構造化例外は、概念的に、この同じことを達成しようとしている"継続可能"の例外をサポートしていることに注意してください。
彼らはいくつかのコードは、断層運動計算を再起動する方法を決定しましょう。
有意に多くのエラーが発生しやすい - - キーパーパターンよりも、残念ながら、彼らはむしろ、言語のファーストクラスのオブジェクトよりも、コールスタック上の周囲のハンドラを使用して、これまでにあまりエレガントです完了です。

## Future Directions: Effect Typing

Most people asked us about whether having async and throws as type system attributes bifurcated the entire universe of libraries.
The answer was "No, not really." But it sure was painful in highly polymorphic library code.

The most jarring example was combinators like map, filter, sort, etc.
In those cases, you often have arbitrary functions and want the async and throws attributes of those functions to "flow through" transparently.

The design we had to solve this was to let you parameterize over effects.
For instance, here is a universal mapping function, Map, that propagates the async or throws effect of its func parameter:
ほとんどの人は非同期を有し、型システム属性は、ライブラリの宇宙全体を分岐として投げるかどうかについての私達に尋ねました。
答えは"いいえ、そうでもない。"でしたしかし、それは確かに高度に多型ライブラリのコードに苦痛でした。

最も耳障りな例では、マップ、フィルタ、並べ替え、などのようなコンビネータました
これらのケースでは、多くの場合、任意の関数を持っていると非同期をしたいし、それらの機能の属性は透過的"に流れる"にスローされます。

我々はこの問題を解決しなければならなかったデザインは、効果の上にパラメータ化させることでした。
例えば、ここでは非同期に伝播したり、 FUNC パラメータの影響をスローユニバーサルマッピング機能、マップは、次のとおりです。

```
U[] Map<T, U, effect E>(T[] ts, Func<T, U, E> func) E {
  U[] us = new U[ts.Length];
  for (int i = 0; i < ts.Length; i++) {
    us[i] = effect(E) func(ts[i]);
  }
  return us;
}
```

Notice here that we've got an ordinary generic type, E, except that its declaration is prefixed by the keyword effect.
We then use E symbolically in place of the effects list of the Map signature, in addition to using it in the "propagate" position via effect(E) when invoking func.
It's a pretty trivial exercise in substitution, replacing E with throws and effect(E) with try, to see the logical transformation.

A legal invocation might be:
私たちは、その宣言は、キーワードの効果が付けられていることを除いて、通常のジェネリック型、 E を持っていることをここで注意してください。
私たちは、その後、 FUNC を呼び出すときに効果( E )を介して"伝播"の位置にそれを使用することに加えて、地図の署名の効果リストの代わりに象徴 E を使用します。
これは、論理的な変換を確認するために、試してみるとスローし、効果( E )と E を置き換える、置換ではかなり些細な運動です。

法律上の呼び出しは次のようになります。

```
int[] xs = ...;
string[] ys = try Map<int, string, throws>(xs, x => ...);
```

Notice here that the throws flows through, so that we can pass a callback that throws exceptions.

As a total aside, we discussed taking this further, and allowing programmers to declare arbitrary effects.
I've hypothesized about such a type system previously.
We were concerned, however, that this sort of higher order programming might be gratuitously clever and hard to understand, no matter how powerful.
The simple model above probably would've been a sweet spot and I think we'd have done it given a few more months.
私たちは、例外をスローするコールバックを渡すことができるように、流れるスローすることをここで注意してください。

余談合計として、私たちはこれをさらに取って、プログラマが任意の効果を宣言することができますについて議論しました。
私は以前に、このようなタイプのシステムについて仮説を立てました。
私たちは、より高次のプログラミングのこの種のは、どんなに強力な、理解することが無償で賢いと難しいかもしれないこと、しかし、懸念されました。
おそらく上記の単純なモデルは、スイートスポットとなっていただろうと私たちは、数ヶ月以上与えられたそれを行っていると思います。

## Retrospective and Conclusions

We've reached the end of this particular journey.
As I said at the outset, a relatively predictable and tame outcome.
But I hope all that background helped to take you through the evolution as we sorted through the landscape of errors.

In summary, the final model featured:
我々は、この特定の旅の終わりに達しました。
私は当初、比較的予測と飼いならさ結果で述べたように。
しかし、私はすべてのことの背景には、我々はエラーの風景を通してソートとして進化をお連れするのに役立った願っています。

要約すると、最終的なモデルが特色:

- An architecture that assumed fine-grained isolation and recoverability from failure.
- Distinguishing between bugs and recoverable errors.
- Using contracts, assertions, and, in general, abandonment for all bugs.
- Using a slimmed down checked exceptions model for recoverable errors, with a rich type system and language syntax.
- Adopting some limited aspects of return codes - like local checking - that improved reliability.
- 障害からきめの細かい分離および回収可能性を想定アーキテクチャ。
- バグや回復可能なエラーの区別。
- すべてのバグのため、一般的には、中断を契約、アサーションを使用して、と。
- 豊富な種類のシステムと言語の構文で、回復可能なエラーのためのスリムチェック例外モデルを使用しました。
- 地元のチェックのような - - 信頼性を向上させリターンコードのいくつかの限定された局面を採用。

And, though this was a multi-year journey, there were areas of improvement we were actively working on right up until our project's untimely demise.
I classified them differently because we didn't have enough experience using them to claim success.
I would have hoped we'd have tidied up most of them and shipped them if we ever got that far.
In particular, I'd have liked to put this one into the final model category:
これは複数年の旅でしたがそして、私たちは積極的に右の私たちのプロジェクトの早死にまで作業していた改善点がありました。
我々は成功を主張するためにそれらを使用して十分な経験を持っていなかったので、私は違ったそれらを分類しました。
私は、私たちが今までそこまで得た場合、我々はそれらのほとんどを片付け、それらを出荷しているだろう期待しているだろう。
特に、私は最終的なモデルのカテゴリにこの 1 を置くことを言っていると思います:

- Leveraging non-null types by default to eliminate a large class of nullability annotations.
- null 値を許可する注釈の大きなクラスを排除するために、デフォルトで null 以外のタイプを活用。

Abandonment, and the degree to which we used it, was in my opinion our biggest and most successful bet with the Error Model.
We found bugs early and often, where they are easiest to diagnose and fix.
Abandonment-based errors outnumbered recoverable errors by a ratio approaching 10:1, making checked exceptions rare and tolerable to the developer.

Although we never had a chance to ship this, we have since brought some of these lessons learned to other settings.

During the Microsoft Edge browser rewrite from Internet Explorer, for example, we adopted abandonment in a few areas.
The key one, applied by a Midori engineer, was OOM.
The old code would attempt to limp along as I described earlier and almost always did the wrong thing.
My understanding is that abandonment has found numerous lurking bugs, as was our experience regularly in Midori when porting existing codebases.
The great thing too is that abandonment is more of an architectural discipline that can be adopted in existing code-bases ranging in programming languages.

The architectural foundation of fine-grained isolation is critical, however many systems have an informal notion of this architecture.
A reason why OOM abandonment works well in a browser is that most browsers devote separate processes to individual tabs already.
Browsers mimic operating systems in many ways and here too we see this playing out.

More recently, we've been exploring proposals to bring some of this discipline - including contracts - to C++ .
There are also concrete proposals to bring some of these features to C# too.
We are actively iterating on a proposal that would bring some non-null checking to C# .
I have to admit, I wish all of those proposals the best, however nothing will be as bulletproof as an entire stack written in the same error discipline.
And remember, the entire isolation and concurrency model is essential for abandonment at scale.

I am hopeful that continued sharing of knowledge will lead to even more wide-scale adoption some of these ideas.

And, of course, I've mentioned that Go, Rust, and Swift have given the world some very good systems-appropriate error models in the meantime.
I might have some minor nits here and there, but the reality is that they're worlds beyond what we had in the industry at the time we began the Midori journey.
It's a good time to be a systems programmer!

Next time I'll talk more about the language.
Specifically, we'll see how Midori was able to tame the garbage collector using a magical elixir of architecture, language support, and libraries.
I hope to see you again soon!
中断、そして我々はそれを使用する度、私の意見ではエラーモデルとの最大かつ最も成功した賭けでした。
彼らは診断と修正するのが最も簡単である場合我々は、早期かつ頻繁にバグを発見しました。
開発者に稀で、許容チェック例外を作り、 1 :中断ベースのエラーが 10 に近づい比で回復可能なエラーを上回っ。

我々はこれを出荷する機会があったことはありませんが、我々はそれ以来これらのレッスンのいくつかは他の設定に学んで持ってきました。

Internet Explorer での Microsoft エッジブラウザ書き直し時には、例えば、我々はいくつかの領域に中断を採用しました。
Midori エンジニアによって適用する鍵 1 は、 OOM ました。
古いコードは、私が先に説明し、ほとんど常に間違ったことをしたとしてもたつくしようとしていました。
私の理解では、既存のコードベースを移植する際 Midori で定期的に私たちの経験だったとして中断は、数多く潜んでいるバグを発見したということです。
素晴らしいところは、あまりにも中断は、プログラミング言語に至るまで、既存のコード-拠点で採用することができる建築の規律のよりであるということです。

きめの細かい分離のアーキテクチャ基盤は、しかし、多くのシステムでは、このアーキテクチャの非公式の概念を持っている、非常に重要です。
OOM の中断がブラウザでうまく機能する理由は、ほとんどのブラウザが既に個々のタブに別々のプロセスを捧げることです。
ブラウザは多くの方法でオペレーティングシステムを模倣し、ここでも我々はこの演奏を参照してください。

C++ に - 契約を含む - 最近では、我々はこの規律のいくつかを持って提案を模索してきました。
あまりにも C# のにこれらの機能のいくつかを持って具体的な提案もあります。
我々は積極的に C# にいくつかの非ヌルチェックをもたらす提案に反復されています。
私は認めざるを得ない、私は最高のそれらの提案のすべてを願って、しかし何も同じエラー規律で書かれたスタック全体のように防弾ません。
そして、全体の隔離や同時実行モデルはスケールの中断のために不可欠である、覚えておいてください。

私は知識の継続的な共有がさらに大規模な採用にこれらのアイデアのいくつかをリードすることを期待しています。

 Go 、 Rust 、および Swift は、その間に世界をいくつかの非常に良いシステム-適切なエラーモデルを与えていることと、もちろん、私が述べました。
私はここにあるいくつかのマイナーなニットを持っているかもしれないが、現実には、彼らが我々は Midori の旅を始めた時点で、業界にいたものを超えた世界だということです。
これは、システムプログラマーであることには良い時間です！

次回は、私は言語について詳しく説明します。
具体的には、 Midori のアーキテクチャ、言語サポート、およびライブラリの魔法の万能薬を使用して、ガベージコレクタを飼いならすことができた方法を見ていきます。
私はすぐに再びお会いしたいです！
