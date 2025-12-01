---
type: podcast
tags: ["privacy sandbox"]
audio: https://files.mozaic.fm/mozaic-ep191.mp3
published_at: 2025-11-29
guest: 石井さん
---

# ep191 Privacy Sandbox

## Theme

第 191 回のテーマは Privacy Sandbox です。

2019 年に始まった Privacy Sandbox という一連の取り組みは、3rd Party Cookie の削除を目標に続けられましたが、2025 年に思わぬ形で終わりを迎えました。

この取り組みはなんだったのか、実際に広告業界で Privacy Sandbox に取り組んできた石井さんとともに振り返り、3rd Party Cookie の現状や広告の今後、そこから見えるこれからの Web について議論しました。

## Show Note

- Intelligent Tracking Prevention | WebKit
  - https://webkit.org/blog/7675/intelligent-tracking-prevention/
- Chromium Blog: Potential uses for the Privacy Sandbox
  - https://blog.chromium.org/2019/08/potential-uses-for-privacy-sandbox.html
- Update on Plans for Privacy Sandbox Technologies
  - https://privacysandbox.com/news/update-on-plans-for-privacy-sandbox-technologies/
  - Continue to support
    - Bounce tracking mitigations
    - CHIPS
    - FedCM
    - Fenced Frames
    - frame-ancestors directive
    - Private State Tokens
    - Storage and Network State Partitioning
    - Storage Access (including Storage Access Header)
    - User-Agent Client Hints
    - User-Agent reduction
  - Deprecate and remove
    - Aggregation Service
    - **Attribution Reporting**
    - Private Aggregation
    - **Protected Audience**
    - **Related Web Sites** (including requestStorageAccessFor())
    - Shared Storage (including Select URL)
    - **Topics**
  - Discontinue
    - IP Protection
    - Partitioned Popins
    - Related Website Partition
  - Do not launch
    - Fenced Storage Read
    - Private Proofs
    - Probabilistic Reveal Tokens
    - Script Blocking
