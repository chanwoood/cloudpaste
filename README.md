# 云剪贴


![mp](https://upload-images.jianshu.io/upload_images/5690299-834684902e038a83.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 说明

这个我个人开发的微信小程序。

需求是这样的：
我经常需要用到图书馆电脑（图书馆电脑屏幕又大又清晰），但是我又不想在这些公共电脑登陆微信、QQ 之类的个人账号。那么，问题来了，经常我在手机微信上看到一些好文章，放上大屏幕的电脑上看更舒适。如何将这篇文章链接传输到电脑呢？

除此之外，还经常需要跨设备传输一段文本，或者文件。

一个极致的做法是：把链接、文本、文件转换成一条短链接，通过这条短链接就能访问相应资源。这就是「云剪贴」的初衷。

## 链接



![链接](https://upload-images.jianshu.io/upload_images/5690299-bb11c05e6fac3fcd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


把一条长链接转换为短链接，我选用的是新浪短链接 API 。

很简单，通过 GET 方法访问：
"https://api.weibo.com/2/short\_url/shorten.json?source=2849184197&url\_long=" + long\_url
即可返回对于的短链接。

## 文本



![文本](https://upload-images.jianshu.io/upload_images/5690299-0f0a0d709a6315ea.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


很多可以剪贴文本，生成在线访问的网址都是国外的，如 [http://paste.ubuntu.com/](http://paste.ubuntu.com/) ，这些国外网址都没有 ICP 证书，而腾讯方面又要求所访问的域名都必须有 ICP 证书，且 HTTPs 加密。

千辛万苦才找到这个网址：[https://nutz.cn/s/](https://nutz.cn/s/) ，通过这个网站生成链接，然后再把这个链接转换成新浪短链接。

## 文件

这才是真的坑，同样是很多国外网址有类似功能，只有稍微分析一下网站，完全可以拿过来自己用，如 [https://send.firefox.com/](https://send.firefox.com/) 。只是腾讯限制不能访问。

最后发现这个网站：[https://cowtransfer.com/](https://cowtransfer.com/) ，上传、下载速度都很快，且是国内网站。但是我分析这个网站时，发现它是用七牛云存储，需要一个 token ，这个 token 由三段组成，第二段是 base64 编码后的字符，跟我用 base64 编码后的结果居然不一样，就卡在这里了。
经网友指点，发现还可以直接把这个网站当做 iframe 塞进小程序页面，小程序有个组件「web-view」可以实现这个功能，然而腾讯又不许个人用户用这个组件，真的坑，即使企业使用，也要在服务器端放一些指定文件来证明这是你的网站，真猥琐，真的坑。

现在文件还没搞好。

## 其他

每次进入小程序时，会读取系统剪贴板内容，自动设置成文本输入框内容。无需用户手动粘贴。
