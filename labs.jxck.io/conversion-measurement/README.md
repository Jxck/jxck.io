# Conversion Measurement API

## CM-API

### Impression

```html
<a href=https://advertiser.labs.jxck.io/conversion-measurement/item.html
   target=_parent
   impressiondata=1111111111111111
   conversiondestination=https://advertiser.labs.jxck.io
   reportingorigin=https://adtech.labs.jxck.io
   impressionexpiry=864000000>
  <img
    width=300
    src=https://logo.jxck.io/jxck.svg
    >
</a>
```

| Impression Data  | Impression origin              | Conversion Destination          | Reporting Origin            | Impression Time       | Expiry Time          |
|:-----------------|:-------------------------------|:--------------------------------|:----------------------------|:----------------------|:---------------------|
| 1111111111111111 | https://publisher.labs.jxck.io | https://advertiser.labs.jxck.io | https://adtech.labs.jxck.io | 2/25/2021, 3:52:16 PM | 3/7/2021, 3:52:16 PM |



### Conversion Report

```js
$img.src = `https://adtech.labs.jxck.io/conversion-measurement/conversion.cgi?${search.toString()}`
```


| Impression Data  | Conversion Data | Conversion Origin               | Reporting Origin            | Report Time           | Attribution Credit |
|:-----------------|:----------------|:--------------------------------|:----------------------------|:----------------------|:-------------------|
| 1111111111111111 | 1               | https://advertiser.labs.jxck.io | https://adtech.labs.jxck.io | 2/27/2021, 3:52:16 PM | 100                |
