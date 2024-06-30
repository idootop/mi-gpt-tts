# 💬 常见问题

> 善用搜索，大多数问题都可在此处找到答案。如果你有新的问题，欢迎提交 [issue](https://github.com/idootop/mi-gpt-tts/issues)。

**Q：开启第三方 TTS 后小爱音箱不说话了，而且 TTS 控制台没有收到请求**

这种情况有两种可能：

- 你的小爱音箱连接到的 Wi-Fi 网络无法正常访问你的 TTS 服务接口
- 假如你使用了内外穿透或者反向代理等服务，你的 TTS 服务接口返回的 headers 可能会被修改，丢掉了某些关键 headers

如果你的 TTS 服务控制台能收到 MiGPT 的 TTS 请求，说明第 2 种情况的可能性比较大；如果没有收到任何请求，说明是第一种情况。相关 [issue](https://github.com/idootop/mi-gpt/issues/107)

你可以用小爱音箱使用的 Wi-Fi 在浏览器打开链接：`http://[你的公网/局域网地址]:4321/api/tts.mp3`

如果不能正常访问说明你的小爱音箱无法访问到你设置的 `TTS_BASE_URL`，故无法在小爱音箱上正常播放 TTS 音频链接。

另外，检查上面网络请求返回的 Response 中是否包含以下 headers，如有缺失请配置你的反向代理/内网穿透服务，保留相关 headers。

```js
response.writeHead(200, {
  "Transfer-Encoding": "chunked",
  "Content-Type": "audio/mp3",
});
```

**Q：语音合成失败，提示 extract request resource id: get resource id: access denied**

以下是一些可能的原因，相关 [issue](https://github.com/idootop/mi-gpt/issues/110)

1. 检查你在火山引擎开通的服务是否为“语音合成”，而非“音色转换”、“精品长文本声音合成”等服务
2. 检查你的 Cluster ID 是否为 `volcano_tts`
3. 检查是否已经开启**试用**音色，未开启使用将无法使用相关音色

**Q：TTS 服务经常崩溃退出，比如 AI 回答比较长时**

请将 TTS 服务镜像/代码更新到 v1.2.0 版本及以上。

**Q：AI 回答内容比较长时，小爱音箱没有回复**

火山语音合成功能的单次文字长度上限为 1024 字节，超出后将抛出异常。目前暂未对长文本场景做适配。
