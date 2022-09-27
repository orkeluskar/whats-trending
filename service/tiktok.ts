// fetch("https://ads.tiktok.com/creative_radar_api/v1/popular_trend/sound/list?period=7&page=1&limit=3&search_mode=1&rank_type=popular&country_code=US", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "en-US,en;q=0.9",
//     "anonymous-user-id": "a9fa62401d8643beab5d66664e586e58",
//     "cache-control": "no-cache",
//     "lang": "en",
//     "pragma": "no-cache",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "sec-gpc": "1",
//     "cookie": "tt_csrf_token=dtBOUUEX-cL5F3EDV_sP6pETueKbe7qP8nZA; _ttp=2Bdsk11YXhCYjQBdKElfqF7GDm6; passport_csrf_token=22f85f1738bde76621be71bbb8879f74; passport_csrf_token_default=22f85f1738bde76621be71bbb8879f74; odin_tt=d49f9cd9df5c72a4f3e971935f5c1c5bf36e4985835d039be793d651a9fadef9053909552707be5ce5f77f08926f43404431fb327134b4084e02947902fbee83; _abck=340876F73917EF94991F62823599F6DF~-1~YAAQBjLFF/qZASSDAQAAqRS9ZAi9ius7hxcNW3s449lwNiYy+LjDxFu5MqrVrq0e0NLgnzSoT4NbZf3ZH8jsEjPdpSMXqNHpFDoyNfMkMs8P4QnWVY+QjzDA6z7ivUgmFe0qXlRKqKM96/OHiBlh6GuNbB2A8o5BVT2SqtdPLGCX9wAYBsTZo+O7v6k3DmFtoMqrjJdRTgkOII1NgcIbD2o0RXyHxxkqKuFZoFa8K83Zl2T0sL5V6HU+QEnwIdDj9Ocdn7gsRyRPqK5r3tNJkBChz9Tiswz0psLdMOSSSGWcMvoVXiVZk/85LP3nT6t2zmYkycDI1KtO0QnpvSZRyaQ6ytJ1MzNQ7p9MWzZ+dPEQ1a/P7YTwfFx2RUaQL3jvuorgb/cJi4FpsQ==~-1~-1~-1; bm_sz=20221F5D17BA4D185562372EC9151418~YAAQBjLFF/2ZASSDAQAAqRS9ZBFjC4IxZYEEBNHV8eu4oBFURneVVgkmMYrJzpOAr9ZEqtI3tSHGzX0fKUOP3bBl+banUIVC1y5ijyVrkztmjlkMJX/buV0+uz939j1gd+tjbZWJNxwSF3fgTP8nzx73J/cRvQVXIYmWBRhEw5CR0H+eIy9uH/dJkt3Y9MyrCZo58rDte8X3GWM1t8bcx2bBEkICM9HjwLr46JNqfn6jkFLM9P2cBvOlnvDGZ+3I/sOP3pMxzhW8knyh90745/PZ35fV88X758jDd1QwTAyDtK4=~4473908~3617345; MONITOR_WEB_ID=4ce7365c-3272-49e3-b847-d7fa65bb878b; s_v_web_id=verify_l8cwzcsh_1lVsMNyA_Oxza_42VN_8UxN_Y6V6rKLO6qAp; s_v_web_id=verify_l8cwztw3_OsvGDxnB_55aN_44sT_9gDC_UkxXBKixXyKX; bm_mi=493469C116BCDD62013A4A62A0EF0F91~YAAQBDLFF7Y8vUKDAQAAacfCZBEYk43NKtajmunLIrstD8pulruSM1aK2vLoRH1W6L56OpgoLHIDp0V5PAAGYB5vo1hgVz7npjo5ak9/cS1b7meRRLbfw5vDiurW4UNQcXAO+y6IaYF3816uUHcYrXzu+PBFpS85oijaPKLuhe0mW75d8tlvP31QYa7Y7dHPbAoVKBjp91yV8ifLIvKQgFuwaI0nRH5A7bOI/54HC7XDyZw/IJX/hWDwnxVpa27nMG5zA7Tdy+129URjLD5oIALrnX0k9FI0LNThiinAZxbdzCDMJtjsbZ0ksQkTTlLy19k=~1; bm_sv=2FE31EE7FEB740BD28DB5D6551B407AC~YAAQBDLFF7o8vUKDAQAASNvCZBE+pWH7Sur/shWxIHs44TXtVrSY46ujNwUNzzuQN0GmzKfQxHfoTzUM4nrJUff886HKPwv46ZxlZ/8qJaMs0El0k6hSEHKVopYhSwDoDgoXijcePtYs2imnHCntwRCzG48pOfOgOKxjW+GIEmCqETPHLdbCAnr5O3aMDoXxP8B+vE/D8BMeK+M09a76VWQIfUVnIo6PA3KOEmr1ujr24740gS1FJdokLn/9TpQfrg==~1; ak_bmsc=376E06B700F92FA93D15F810AA1FCBCA~000000000000000000000000000000~YAAQ9zLFF7jz/jyDAQAAxg/DZBHPu33bRrGQyj0FGXEmz1L9CXqReiHtR0IkYCpPQxzoZXXVhlSRTJ6m/UU8WCieXKjFvx/6pJFWWKWurTjTsv2ALiKg7zuuABNKITCK3h7FByncqpSFdPSuQmd1bXXWQ63z01w9wAx1yzyKDlPRe69A5BifiZJ4x5m99EUXn8q0Xkmau0CuwiNucthcEdxnmPBsv0njcxQ6E32+4HSZ3rMyPW0baFYvofQNUfVHYvcoYYJq5IPetOqf1cbxAv8Fqk9yhPrT83abCKsBA7FbosL4JsVtMNJxSIFay83We16V2fhnEweexIK32P0mamq8rOe6G1kPs325opXU13JO15McUqnTvo3oRq2b99Ox8GiBUFXdzBZ9ZX0r1iBWqY+zmKak6NvFcv0Qrm6Nr6hBTLQ=; ttwid=1%7C0mhmd3iDBUl4gvUKDLa_sSA2-BfHao-iub6Jx-I327E%7C1663842751%7Cd7d1e01c2fd263cee172bfd028852e91b2dabad8f9e7d717a9f24a01b3f661de; msToken=2VPjh6nZnSuNE2cyt2Jbf3_2TToWLn7yPyExvjb3VecEDpSF6cQr4sfVCKFu-WdcwSKRaMPdP8f_yDAUMMQcPozekUMCvVjojXBqs5WKFK2dLyyefFLydKZPbYDirZdnEaFG9zHcFdgGIm0=",
//     "Referer": "https://ads.tiktok.com/business/creativecenter/inspiration/popular/music/pad/en?from=001115",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": null,
//   "method": "GET"
// });

export {}