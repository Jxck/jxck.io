# Fixed Plan: mozaic.fm の mp3 管理構成と追加フロー

## tldr

- `~/server/mozaic.fm.git` (bare, origin) と `~/server/mozaic.fm` (clone) が同一 VPS 上にある
- mp3 は Git LFS で管理。bare の `lfs/objects/` が物理的な正本
- `lfs.storage` で clone の LFS cache を bare に向け、さらに hardlink で working tree mp3 と bare object を同 inode 化することで物理 1x に圧縮済
- 新規 mp3 追加は git hook (`post-commit` / `post-merge` / `post-checkout`) と bare の `post-receive` で自動 dedup される
- GitHub mirror push では `remote.github.lfsurl` を VPS に向けてあるので mp3 実体は GitHub に流れない

## 現状の構成

### repo 配置

| パス | 役割 |
|---|---|
| `~/server/mozaic.fm.git` | bare repo (origin)。Git の正本兼 LFS object 保管 |
| `~/server/mozaic.fm` | clone。h2o が `files.mozaic.fm/*.mp3` を serve |
| `~/develop/mozaic.fm` | clone への symlink |
| `github.com/Jxck/mozaic.fm` | 公開 mirror。pointer のみで mp3 実体は載らない |

### LFS storage

mp3 は LFS object として、本来は以下 3 箇所に物理ファイルが置かれ得る:

1. working tree `~/server/mozaic.fm/files.mozaic.fm/*.mp3`
2. clone の LFS cache `~/server/mozaic.fm/.git/lfs/objects/<oid>`
3. bare の LFS storage `~/server/mozaic.fm.git/lfs/objects/<oid>`

mp3 は ~20G あり、何もしないと 3x = 60G を消費する。これを 2 段の dedup で物理 1x に抑えてある。

**段階 1**: clone の `.git/config` に以下を設定し、clone の LFS cache を bare と共有:

```
[lfs]
  storage = /home/jxck/server/mozaic.fm.git/lfs
```

clone は独自 cache を持たず、bare の `lfs/` を直接読み書きする (3 箇所 → 2 箇所)。

**段階 2**: working tree mp3 と bare object を hardlink で同 inode 化 (2 箇所 → 1 箇所)。`chmod 444` で working tree からの書き込みを防ぎ、bare object の破壊を予防。

### hardlink 維持スクリプト

`~/server/mozaic.fm/.git/hooks/relink-lfs.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

REPO=$HOME/server/mozaic.fm
BARE=$HOME/server/mozaic.fm.git
LOCK=/tmp/mozaic-fm-lfs-relink.lock

exec 9>"$LOCK"
flock -n 9 || exit 0

git -C "$REPO" lfs ls-files -l | while read oid _kind path; do
  [[ $path == files.mozaic.fm/*.mp3 ]] || continue
  src=$BARE/lfs/objects/${oid:0:2}/${oid:2:2}/$oid
  dst=$REPO/$path
  [[ -f $src && -f $dst ]] || continue
  chmod 444 "$src"
  [[ "$(stat -c %i "$src")" == "$(stat -c %i "$dst")" ]] && continue
  ln -f "$src" "$dst"
done
```

冪等。`flock` で同時実行を排除。`chmod 444` は inode 判定の前に通すので permission ドリフトも毎回是正。

### 設置済み hook

| hook | 場所 | 役割 |
|---|---|---|
| `post-commit` | clone | LFS 標準 hook の末尾で `relink-lfs.sh` を呼ぶ |
| `post-merge` | clone | 同上 |
| `post-checkout` | clone | 同上 |
| `post-receive` | bare | env unset → main 受信時に clone を `git pull --ff-only`、log は `~/server/mozaic.fm.git/hooks/post-receive.log` |

clone 側 hook は元々 git-lfs 標準の `git lfs post-XXX "$@"` を呼ぶ内容で、それを残したまま末尾に relink を追記してある。

### GitHub mirror への push

`github` remote は `git@github.com:Jxck/mozaic.fm.git` だが、以下の per-remote 設定を入れてあるので LFS object は GitHub には行かず、VPS bare に向く:

```
remote.github.lfsurl     = ssh://jxck@jxck.io/home/jxck/server/mozaic.fm.git
remote.github.lfspushurl = ssh://jxck@jxck.io/home/jxck/server/mozaic.fm.git
```

結果、`git push github main` では Git commit + pointer だけが GitHub に流れる。

## mp3 追加フロー

### A. VPS (clone) で追加

```bash
cp new.mp3 ~/develop/mozaic.fm/files.mozaic.fm/
cd ~/develop/mozaic.fm
git add files.mozaic.fm/new.mp3
git commit -m "add: new.mp3"
# → post-commit hook が relink-lfs.sh を走らせ、新 object を hardlink + chmod 444
git push origin main      # LFS object は既に bare にあるので no-op
git push github main      # mp3 は流れず pointer のみ
```

### B. Mac (remote) で追加

Mac の前提:

- `git-lfs` + `git-lfs-transfer` 導入済 (VPS と同じ手順)
- origin URL は `ssh://jxck@jxck.io/home/jxck/server/mozaic.fm.git`
- `remote.github.lfsurl` / `lfspushurl` を VPS に向ける設定済

```bash
# Mac 側
cp new.mp3 ~/path/to/mozaic.fm/files.mozaic.fm/
cd ~/path/to/mozaic.fm
git add files.mozaic.fm/new.mp3
git commit -m "add: new.mp3"
git push origin main
# → VPS bare に LFS object 着、commit が refs/heads/main に入る
# → bare の post-receive hook が VPS clone を pull
# → VPS clone の post-merge hook が relink-lfs.sh 実行 → 新 mp3 hardlink + 444
git push github main
```

VPS 側で何もせずとも dedup された状態で同期される。

## 確認方法

### inode と permission

特定 mp3 の inode 番号と link count、permission を確認:

```bash
stat -c '%i %h %a %n' \
  ~/server/mozaic.fm/files.mozaic.fm/mozaic-ep0.mp3 \
  ~/server/mozaic.fm.git/lfs/objects/9f/ab/9fab9367c6aa5176317121b26e6c60bc25c9017bf1a3d9dc90e3979cc4babbdc
```

両者で同じ inode 番号、link count >= 2、permission `444` であれば dedup 済。

### ディスク使用量

```bash
df -h ~
```

`du` は同じコマンド内で `files.mozaic.fm/` と `lfs/objects/` を並べると、hardlink により後の側が二重計上されず小さく見える。これはデータが消えているわけではなく同 inode が省略されているため。容量の総量確認は `df` を主とする。

### LFS の整合性

```bash
git -C ~/server/mozaic.fm lfs fsck
```

`mismatch=0 badperm=0 missing=0` が期待値。

### hook の生死

```bash
ls -l ~/server/mozaic.fm/.git/hooks/{relink-lfs.sh,post-commit,post-merge,post-checkout}
ls -l ~/server/mozaic.fm.git/hooks/post-receive
tail -20 ~/server/mozaic.fm.git/hooks/post-receive.log    # Mac push 後の履歴
```

### LFS URL 設定

```bash
git -C ~/server/mozaic.fm config --get lfs.storage
git -C ~/server/mozaic.fm config --get-regexp '^remote\.github\.lfs'
```

`lfs.storage` が `/home/jxck/server/mozaic.fm.git/lfs`、`remote.github.lfsurl` / `lfspushurl` が VPS の SSH URL であることを確認。
