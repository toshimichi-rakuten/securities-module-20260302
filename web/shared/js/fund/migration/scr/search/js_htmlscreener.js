    // アセットタイプ   condition2
    var b_asset = new Array(
        'アセットタイプ2=国内株式',             // 1
        'アセットタイプ2=国内債券',             // 2
        'アセットタイプ2=国内不動産',           // 3
        'アセットタイプ2=海外株式',             // 4
        'アセットタイプ2=海外債券',             // 5
        'アセットタイプ2=海外不動産',           // 6
        'アセットタイプ2=ミックスアセット',     // 7
        'アセットタイプ2=その他'                // 8
    );


    // 設定日   condition8 & condition9
    var b_date = new Array(
        '設定日<=1999/12/31',   // 1(1)
        '設定日>=2000/01/01',   // 2(2-1) 
        '設定日<=2006/12/31',   // 3(2-2) 
        '設定日>=2007/01/01'    // 4(3)
    );


    // 信託報酬 condition13 & condition14
    var b_houshu = new Array(
        '信託報酬 合計<0.5',    // 1(1)
        '信託報酬 合計>=0.5',   // 2(2-1)
        '信託報酬 合計<1.0',    // 3(2-2)
        '信託報酬 合計>=1.0'    // 4(3)
    );


    // ベンチマーク（グループ） condition22
    var b_benchg = new Array(
        'ベンチマーク(グループ)=ｼﾃｨｸﾞﾙｰﾌﾟ',     // 1
        'ベンチマーク(グループ)=ﾀﾞｳｼﾞｮｰﾝｽﾞ',    // 2
        'ベンチマーク(グループ)=ﾒﾘﾙﾘﾝﾁ',        // 3
        'ベンチマーク(グループ)=ﾗｯｾﾙ',          // 4
        'ベンチマーク(グループ)=ﾘｰﾏﾝ',          // 5
        'ベンチマーク(グループ)=日経',          // 6
        'ベンチマーク(グループ)=東証',          // 7
        'ベンチマーク(グループ)=FTSE',          // 8
        'ベンチマーク(グループ)=JASDAQ',        // 9
        'ベンチマーク(グループ)=JPﾓﾙｶﾞﾝ',       // 10
        'ベンチマーク(グループ)=MSCI',          // 11
        'ベンチマーク(グループ)=S＆P',          // 12
        'ベンチマーク(グループ)=その他',        // 13
        'ベンチマーク(グループ)=未設定'         // 14
    );

    // リッパー分類 condition24
    var b_lipper = new Array(
        'リッパー分類=オルタナティブ 株式型 マーケットニュートラル',	// 1
        'リッパー分類=オルタナティブ ロングショート　株式型',		// 2
        'リッパー分類=オルタナティブ　その他',				// 3
        'リッパー分類=コモディティ型',                                  // 4
        'リッパー分類=ターゲットイヤー型　その他',                      // 5
        'リッパー分類=マネー型　グローバル',                            // 6
        'リッパー分類=マネー型　南アフリカランド',			// 7
        'リッパー分類=マネー型　その他',				// 8
        'リッパー分類=ミックスアセット　その他　バランス型',            // 9
        'リッパー分類=ミックスアセット　その他　フレキシブル',          // 10
        'リッパー分類=ミックスアセット　その他　安定型',                // 11
        'リッパー分類=ミックスアセット　その他　積極型',                // 12
        'リッパー分類=ミックスアセット　中国元　積極型',                // 13
        'リッパー分類=ミックスアセット　日本円　バランス型',            // 14
        'リッパー分類=ミックスアセット　日本円　安定型',                // 15
        'リッパー分類=ミックスアセット　日本円　積極型',                // 16
        'リッパー分類=ミックスアセット　米ドル　積極型',                // 17
        'リッパー分類=ミックスアセット　南アフリカランド　積極型',	// 18
        'リッパー分類=ミックスアセット　南アフリカランド　バランス型',	// 19
        'リッパー分類=ミックスアセット　南アフリカランド　安定型',	// 20
        'リッパー分類=ミックスアセット　南アフリカランド　フレキシブル',	// 21
        'リッパー分類=ミックスアセット　ロシアルーブル　積極型',	// 22
        'リッパー分類=ミックスアセット　ロシアルーブル　バランス型',	// 23
        'リッパー分類=ミックスアセット　ロシアルーブル　安定型',	// 24
        'リッパー分類=ミックスアセット　ロシアルーブル　フレキシブル',	// 25
        'リッパー分類=株式型　アジアパシフィック',                      // 26
        'リッパー分類=株式型　アジアパシフィック　除日本',              // 27
        'リッパー分類=株式型　インド株',                                // 28
        'リッパー分類=株式型　エマージングマーケット　グローバル',      // 29
        'リッパー分類=株式型　エマージングマーケット　ラテンアメリカ',  // 30
        'リッパー分類=株式型　エマージングマーケット　欧州',            // 31
        'リッパー分類=株式型　エマージングマーケット　アジア',		// 32
        'リッパー分類=株式型　エマージングマーケット　その他',		// 33
        'リッパー分類=株式型　グローバル',                              // 34
        'リッパー分類=株式型　グローバル　除日本',                      // 35
        'リッパー分類=株式型　ロシア株',                                // 36
        'リッパー分類=株式型　ブラジル株',                              // 37
        'リッパー分類=株式型　欧州株',                                  // 38
        'リッパー分類=株式型　韓国株',                                  // 39
        'リッパー分類=株式型　業種別　IT',                              // 40
        'リッパー分類=株式型　業種別　バイオ',                          // 41
        'リッパー分類=株式型　業種別　公益',                            // 42
        'リッパー分類=株式型　業種別　貴金属',                          // 43
        'リッパー分類=株式型　業種別　資源株',                          // 44
        'リッパー分類=株式型　業種別　非消費製品',                      // 45
        'リッパー分類=株式型　業種別　薬品・ヘルスケア',		// 46
        'リッパー分類=株式型　中国株',                                  // 47
        'リッパー分類=株式型　日本株',                                  // 48
        'リッパー分類=株式型　日本株　中小型株',                        // 49
        'リッパー分類=株式型　北米株',                                  // 50
        'リッパー分類=株式型　北米株　中小型株',                        // 51
        'リッパー分類=株式型　オーストラレーシア',			// 52
        'リッパー分類=株式型　カナダ株',				// 53
        'リッパー分類=株式型　香港株',					// 54
        'リッパー分類=株式型　ＧＣＣ',					// 55
        'リッパー分類=株式型　ＭＥＮＡ',				// 56
        'リッパー分類=株式型　トルコ株',				// 57
        'リッパー分類=株式型　インドネシア株',				// 58
        'リッパー分類=株式型　オーストラリア',				// 59
        'リッパー分類=株式型　南アフリカ株',				// 60
        'リッパー分類=株式型　ベトナム株',				// 61
        'リッパー分類=為替ストラテジー',				// 62
        'リッパー分類=債券型　アジアパシフィック',                      // 63
        'リッパー分類=債券型　エマージング　グローバル',                // 64
        'リッパー分類=債券型　グローバル',                              // 65
        'リッパー分類=債券型　グローバル　円ヘッジ',                    // 66
        'リッパー分類=債券型　グローバル　短期債',                      // 67
        'リッパー分類=債券型　グローバル　ハイイールド',		// 68
        'リッパー分類=債券型　グローバル　インフレ連動',		// 69
        'リッパー分類=債券型　その他　インフレ連動',                    // 70
        'リッパー分類=債券型　ユーロ',                                  // 71
        'リッパー分類=債券型　欧州',                                    // 72
        'リッパー分類=債券型　豪ドル',                                  // 73
        'リッパー分類=債券型　転社　日本',                              // 74
        'リッパー分類=債券型　転社　その他',				// 75
        'リッパー分類=債券型　日本円',                                  // 76
        'リッパー分類=債券型　米ドル',                                  // 77
        'リッパー分類=債券型　米ドル　ハイイールド',                    // 78
        'リッパー分類=債券型　米ドル　社債',                            // 79
        'リッパー分類=債券型　ブラジルレアル',				// 80
        'リッパー分類=債券型　南アフリカランド',			// 81
        'リッパー分類=債券型　ロシアルーブル',				// 82
        'リッパー分類=債券型　インドネシアルピー',			// 83
        'リッパー分類=債券型　その他',					// 84
        'リッパー分類=絶対収益追求型　南アフリカランド　高リスク',	// 85
        'リッパー分類=絶対収益追求型　南アフリカランド　中リスク',	// 86
        'リッパー分類=絶対収益追求型　南アフリカランド　低リスク',	// 87
        'リッパー分類=不動産型　グローバル',                            // 88
        'リッパー分類=不動産型　欧州',                                  // 89
        'リッパー分類=不動産型　日本',                                  // 90
        'リッパー分類=不動産型　北米',                                  // 91
        'リッパー分類=不動産型　その他',                                // 92
        'リッパー分類=不動産型　ロシア',				// 93
        'リッパー分類=非分類',						// 94
        'リッパー分類=ミックスアセット　中国元　バランス型',		// 95
        'リッパー分類=債券型　ユーロ　ハイイールド'			// 96

    );

    // 純資産（下限）   condition11
    var b_shisan1 = '純資産（億円）>=';

    // 純資産（上限）   condition12
    var b_shisan2 = '純資産（億円）<=';


    // 協会分類 condition10
    var b_kyokai = new Array(
        '協会分類=ファンドオブファンズ',                                   // 1
        '協会分類=株式投信追加型/インデックス型/ＴＯＰＩＸ連動型',         // 2
        '協会分類=株式投信追加型/インデックス型/日経２２５連動型',         // 3
        '協会分類=株式投信追加型/バランス型',                              // 4
        '協会分類=株式投信追加型/国際株式型/アジア・オセアニア型',         // 5
        '協会分類=株式投信追加型/国際株式型/一般型',                       // 6
        '協会分類=株式投信追加型/国際株式型/欧州型',                       // 7
        '協会分類=株式投信追加型/国際株式型/北米型',                       // 8
        '協会分類=株式投信追加型/国際株式型/中南米型',                     // 9
        '協会分類=株式投信追加型/国内株式型/一般型',                       // 10
        '協会分類=株式投信追加型/国内株式型/中小型株型',                   // 11
        '協会分類=株式投信追加型/国内株式型/店頭株型',                     // 12
        '協会分類=株式投信追加型/転換社債型',                              // 13
        '協会分類=株式投信追加型/派生商品型',                              // 14
        '協会分類=株式投信追加型/インデックス型/その他インデックス連動型',  // 15
        '協会分類=株式投信追加型／国内株式型／大型株型'                     // 16
    );

    // トータルリターン condition15, condition16
    var b_return = new Array(
        'ﾘﾀｰﾝ(年率)6ヶ月like*', // 1 (1-1-1)
        'ﾘﾀｰﾝ(年率)6ヶ月<0',    // 2 (1-2-1)
        'ﾘﾀｰﾝ(年率)6ヶ月>=0',   // 3 (1-3-1)
        'ﾘﾀｰﾝ(年率)6ヶ月<10',   // 4 (1-3-2)
        'ﾘﾀｰﾝ(年率)6ヶ月>=10',  // 5 (1-4-1)
        'ﾘﾀｰﾝ(年率)6ヶ月<20',   // 6 (1-4-2)
        'ﾘﾀｰﾝ(年率)6ヶ月>=20',  // 7 (1-5-1)
        'ﾘﾀｰﾝ(年率)1年like*',   // 8 (2-1-1)
        'ﾘﾀｰﾝ(年率)1年<0',      // 9 (2-2-1)
        'ﾘﾀｰﾝ(年率)1年>=0',     // 10(2-3-1)
        'ﾘﾀｰﾝ(年率)1年<10',     // 11(2-3-2)
        'ﾘﾀｰﾝ(年率)1年>=10',    // 12(2-4-1)
        'ﾘﾀｰﾝ(年率)1年<20',     // 13(2-4-2)
        'ﾘﾀｰﾝ(年率)1年>=20',    // 14(2-5-1)
        'ﾘﾀｰﾝ(年率)2年like*',   // 15(3-1-1)
        'ﾘﾀｰﾝ(年率)2年<0',      // 16(3-2-1)
        'ﾘﾀｰﾝ(年率)2年>=0',     // 17(3-3-1)
        'ﾘﾀｰﾝ(年率)2年<10',     // 18(3-3-2)
        'ﾘﾀｰﾝ(年率)2年>=10',    // 19(3-4-1)
        'ﾘﾀｰﾝ(年率)2年<20',     // 20(3-4-2)
        'ﾘﾀｰﾝ(年率)2年>=20',    // 21(3-5-1)
        'ﾘﾀｰﾝ(年率)3年like*',   // 22(4-1-1)
        'ﾘﾀｰﾝ(年率)3年<0',      // 23(4-2-1)
        'ﾘﾀｰﾝ(年率)3年>=0',     // 24(4-3-1)
        'ﾘﾀｰﾝ(年率)3年<10',     // 25(4-3-2)
        'ﾘﾀｰﾝ(年率)3年>=10',    // 26(4-4-1)
        'ﾘﾀｰﾝ(年率)3年<20',     // 27(4-4-2)
        'ﾘﾀｰﾝ(年率)3年>=20',    // 28(4-5-1)
        'ﾘﾀｰﾝ(年率)5年like*',   // 29(5-1-1)
        'ﾘﾀｰﾝ(年率)5年<0',      // 30(5-2-1)
        'ﾘﾀｰﾝ(年率)5年>=0',     // 31(5-3-1)
        'ﾘﾀｰﾝ(年率)5年<10',     // 32(5-3-2)
        'ﾘﾀｰﾝ(年率)5年>=10',    // 33(5-4-1)
        'ﾘﾀｰﾝ(年率)5年<20',     // 34(5-4-2)
        'ﾘﾀｰﾝ(年率)5年>=20'     // 35(5-5-1)
    );

    // シャープレシオ   condition17, condition18
    var b_ratio = new Array(
        'ｼｬｰﾌﾟﾚｼｵ6ヶ月like*',   // 1 (1-1-1)
        'ｼｬｰﾌﾟﾚｼｵ6ヶ月<0',      // 2 (1-2-1)
        'ｼｬｰﾌﾟﾚｼｵ6ヶ月>=0',     // 3 (1-3-1)
        'ｼｬｰﾌﾟﾚｼｵ6ヶ月<1',      // 4 (1-3-2)
        'ｼｬｰﾌﾟﾚｼｵ6ヶ月>=1',     // 5 (1-4-1)
        'ｼｬｰﾌﾟﾚｼｵ6ヶ月<2',      // 6 (1-4-2)
        'ｼｬｰﾌﾟﾚｼｵ6ヶ月>=2',     // 7 (1-5-1)
        'ｼｬｰﾌﾟﾚｼｵ1年like*',     // 8 (2-1-1)
        'ｼｬｰﾌﾟﾚｼｵ1年<0',        // 9 (2-2-1)
        'ｼｬｰﾌﾟﾚｼｵ1年>=0',       // 10(2-3-1)
        'ｼｬｰﾌﾟﾚｼｵ1年<1',        // 11(2-3-2)
        'ｼｬｰﾌﾟﾚｼｵ1年>=1',       // 12(2-4-1)
        'ｼｬｰﾌﾟﾚｼｵ1年<2',        // 13(2-4-2)
        'ｼｬｰﾌﾟﾚｼｵ1年>=2',       // 14(2-5-1)
        'ｼｬｰﾌﾟﾚｼｵ2年like*',     // 15(3-1-1)
        'ｼｬｰﾌﾟﾚｼｵ2年<0',        // 16(3-2-1)
        'ｼｬｰﾌﾟﾚｼｵ2年>=0',       // 17(3-3-1)
        'ｼｬｰﾌﾟﾚｼｵ2年<1',        // 18(3-3-2)
        'ｼｬｰﾌﾟﾚｼｵ2年>=1',       // 19(3-4-1)
        'ｼｬｰﾌﾟﾚｼｵ2年<2',        // 20(3-4-2)
        'ｼｬｰﾌﾟﾚｼｵ2年>=2',       // 21(3-5-1)
        'ｼｬｰﾌﾟﾚｼｵ3年like*',     // 22(4-1-1)
        'ｼｬｰﾌﾟﾚｼｵ3年<0',        // 23(4-2-1)
        'ｼｬｰﾌﾟﾚｼｵ3年>=0',       // 24(4-3-1)
        'ｼｬｰﾌﾟﾚｼｵ3年<1',        // 25(4-3-2)
        'ｼｬｰﾌﾟﾚｼｵ3年>=1',       // 26(4-4-1)
        'ｼｬｰﾌﾟﾚｼｵ3年<2',        // 27(4-4-2)
        'ｼｬｰﾌﾟﾚｼｵ3年>=2',       // 28(4-5-1)
        'ｼｬｰﾌﾟﾚｼｵ5年like*',     // 29(5-1-1)
        'ｼｬｰﾌﾟﾚｼｵ5年<0',        // 30(5-2-1)
        'ｼｬｰﾌﾟﾚｼｵ5年>=0',       // 31(5-3-1)
        'ｼｬｰﾌﾟﾚｼｵ5年<1',        // 32(5-3-2)
        'ｼｬｰﾌﾟﾚｼｵ5年>=1',       // 33(5-4-1)
        'ｼｬｰﾌﾟﾚｼｵ5年<2',        // 34(5-4-2)
        'ｼｬｰﾌﾟﾚｼｵ5年>=2'        // 35(5-5-1)
    );    


    // ベンチマーク condition23
    var b_bench = new Array(
        'ベンチマーク=ｼﾃｨｸﾞﾙｰﾌﾟ ｱﾒﾘｶ国債指数 ｢配当込｣&lt;円換算&gt;',                   // 1
        'ベンチマーク=ｼﾃｨｸﾞﾙｰﾌﾟ ｵｰｽﾄﾗﾘｱ国債指数 ｢配当込｣&lt;円換算&gt;',                // 2
        'ベンチマーク=ｼﾃｨｸﾞﾙｰﾌﾟ ﾕｰﾛBIG債券指数 ｢配当込｣&lt;円換算&gt;',                 // 3
        'ベンチマーク=ｼﾃｨｸﾞﾙｰﾌﾟ 世界国債指数 (ﾄﾞﾙ建) ｢配当込｣&lt;円換算&gt;',           // 4
        'ベンチマーク=シティグループ 世界国債指数(円ヘッジ) 「配当込」',                // 5
        'ベンチマーク=ｼﾃｨｸﾞﾙｰﾌﾟ 世界国債指数(1年-3年) ｢配当込｣&lt;円換算&gt;',          // 6
        'ベンチマーク=ｼﾃｨｸﾞﾙｰﾌﾟ 日本国債指数 ｢配当込｣',                                 // 7
        'ベンチマーク=ｼﾃｨｸﾞﾙｰﾌﾟ 欧州世界国債指数 ｢配当込｣&lt;円換算&gt;',               // 8
        'ベンチマーク=ｼﾞｬｽﾀﾞｯｸ指数',                                                    // 9
        'ベンチマーク=ﾀﾞｳｼﾞｮｰﾝｽﾞ Stoxx 50&lt;円換算&gt;',                               // 10
        'ベンチマーク=ﾎﾞﾝﾍﾞｲ 100&lt;円換算&gt;',                                        // 11
        'ベンチマーク=ボベスパ指数&lt;円換算&gt;',                                      // 12
        'ベンチマーク=ﾒﾘﾙﾘﾝﾁ ｸﾞﾛｰﾊﾞﾙｴﾏｰｼﾞﾝｸﾞｿﾌﾞﾘﾝ指数 ｢配当込｣&lt;円換算&gt;',          // 13
        'ベンチマーク=ﾒﾘﾙﾘﾝﾁ USﾊｲｲｰﾙﾄﾞ指数 ｢配当込｣&lt;円換算&gt;',                     // 14
        'ベンチマーク=ﾗｯｾﾙ2000 ｢配当込｣&lt;円換算&gt;',                                 // 15
        'ベンチマーク=ﾘｰﾏﾝ･ﾌﾞﾗｻﾞｰｽﾞ･US･ｺｰﾎﾟﾚｰﾄ･ﾊｲ･ｲｰﾙﾄﾞ指数 ｢配当込｣&lt;円換算&gt;',    // 16
        'ベンチマーク=ﾛｼｱ ﾓｽｸﾜﾀｲﾑｽﾞ&lt;円換算&gt;',                                     // 17
        'ベンチマーク=日経225',                                                         // 18
        'ベンチマーク=東証第2部株価指数',                                               // 19
        'ベンチマーク=東証REIT指数',                                                    // 20
        'ベンチマーク=韓国KOSPI指数&lt;円換算&gt;',                                     // 21
        'ベンチマーク=FTSE AW/ｵｲﾙ･ｶﾞｽ ｢配当込｣&lt;円換算&gt;',                          // 22
        'ベンチマーク=FTSE AW/ﾃｸﾉﾛｼﾞｰ ｢配当込｣&lt;円換算&gt;',                          // 23
        'ベンチマーク=FTSE AW/公益 ｢配当込｣&lt;円換算&gt;',                             // 24
        'ベンチマーク=FTSE AW/鉱業 ｢配当込｣&lt;円換算&gt;',                             // 25
        'ベンチマーク=FTSE EPRA/NAREIT 米国 ｢配当込｣&lt;円換算&gt;',                    // 26
        'ベンチマーク=FTSE EPRA/NAREIT ｱｼﾞｱ｢配当込｣&lt;円換算&gt;',                     // 27
        'ベンチマーク=FTSE EPRA/NAREIT ｸﾞﾛｰﾊﾞﾙ ｢配当込｣&lt;円換算&gt;',                 // 28
        'ベンチマーク=FTSE EPRA/NAREIT ﾖｰﾛｯﾊﾟ ｢配当込｣&lt;円換算&gt;',                  // 29
        'ベンチマーク=JPﾓﾙｶﾞﾝ ｸﾞﾛｰﾊﾞﾙﾏﾈｰﾏｰｹｯﾄ3ヶ月&lt;円換算&gt;',                      // 30
        'ベンチマーク=JPﾓﾙｶﾞﾝ EMBI+ ｱｼﾞｱ 指数&lt;円換算&gt;',                           // 31
        'ベンチマーク=Jefferies Active Convertible Japan',                              // 32
        'ベンチマーク=MSCI ｱﾗﾋﾞｱﾝﾏｰｹｯﾄ指数 ｢配当込｣&lt;円換算&gt;',                     // 33
        'ベンチマーク=MSCI ｴﾏｰｼﾞﾝｸﾞ ﾌｧｰ･ｲｰｽﾄ ｢配当込｣&lt;円換算&gt;',                   // 34
        'ベンチマーク=MSCI ｴﾏｰｼﾞﾝｸﾞ ﾗﾃﾝｱﾒﾘｶ ｢配当込｣&lt;円換算&gt;',                    // 35
        'ベンチマーク=MSCI ｴﾏｰｼﾞﾝｸﾞ 東欧 ｢配当込｣&lt;円換算&gt;',                       // 36
        'ベンチマーク=MSCI ｴﾏｰｼﾞﾝｸﾞ･ﾏｰｹｯﾄ ｢配当込｣&lt;円換算&gt;',                      // 37
        'ベンチマーク=MSCI ﾁｬｲﾅ指数 ｢配当込｣&lt;円換算&gt;',                            // 38
        'ベンチマーク=MSCI ｺｸｻｲ指数 ｢配当込｣&lt;円換算&gt;',                            // 39
        'ベンチマーク=MSCI ﾜｰﾙﾄﾞ/ﾊﾞｲｵﾃｸﾉﾛｼﾞｰ ｢配当込｣&lt;円換算&gt;',                   // 40
        'ベンチマーク=MSCI ﾜｰﾙﾄﾞ/消費財｢配当込｣&lt;円換算&gt;',                         // 41
        'ベンチマーク=MSCI 世界株価指数 ｢配当込｣&lt;円換算&gt;',                        // 42
        'ベンチマーク=MSCI AC ｱｼﾞｱ･ﾊﾟｼﾌｨｯｸ ｢配当込｣&lt;円換算&gt;',                     // 43
        'ベンチマーク=MSCI AC ｱｼﾞｱ･ﾊﾟｼﾌｨｯｸ(除日本) ｢配当込｣&lt;円換算&gt;',             // 44
        'ベンチマーク=MSCI BRICs指数 ｢配当込｣&lt;円換算&gt;',                           // 45
        'ベンチマーク=S&amp;P GSCI商品指数｢配当込｣&lt;円換算&gt;',                      // 46
        'ベンチマーク=S&amp;P500 ｢配当込｣&lt;円換算&gt;',                               // 47
        'ベンチマーク=TOPIX ｢配当込｣',                                                  // 48        
        'ベンチマーク=ASX 全普通株指数 「配当込」&lt;円換算&gt;',                       // 49
        'ベンチマーク=JPﾓﾙｶﾞﾝ EMBI+ ﾗﾃﾝｱﾒﾘｶ指数&lt;円換算&gt;',                         // 50
        'ベンチマーク=S&amp;Pトロント株価指数',                                         // 51
        'ベンチマーク=MSCI ワールド/ヘルスケア 「配当込」&lt;円換算&gt;',               // 52
        'ベンチマーク=ハンセン総合指数&lt;円換算&gt;',                                  // 53
        'ベンチマーク=ﾒﾘﾙﾘﾝﾁ ｸﾞﾛｰﾊﾞﾙﾊｲｲｰﾙﾄﾞ指数 「配当込」&lt;円換算&gt;',               // 54

        'ベンチマーク=MSCIｲﾝﾄﾞﾈｼｱ指数 「配当込」&lt;円換算&gt;',               // 55
        'ベンチマーク=ｲﾝﾄﾞﾈｼｱ政府債 「配当込」&lt;円換算&gt;',               // 56
        'ベンチマーク=ﾍﾞﾄﾅﾑ指数&lt;円換算&gt;',               // 57

        'ベンチマーク=未設定'                                                          // 58
    );

    // レーティング（トータルリターン） condition26
    /*
    var b_rate1 = new Array(
        'LLｽｺｱ ﾄｰﾀﾙﾘﾀｰﾝ 3年=1', // 1
        'LLｽｺｱ ﾄｰﾀﾙﾘﾀｰﾝ 3年=2', // 2
        'LLｽｺｱ ﾄｰﾀﾙﾘﾀｰﾝ 3年=3', // 3
        'LLｽｺｱ ﾄｰﾀﾙﾘﾀｰﾝ 3年=4', // 4
        'LLｽｺｱ ﾄｰﾀﾙﾘﾀｰﾝ 3年=5'  // 5
    );
    */
    var b_rate1 = new Array(
        'l1=1', // 1
        'l1=2', // 2
        'l1=3', // 3
        'l1=4', // 4
        'l1=5'  // 5
    );
    // レーティング（リスク調整後リターン） condition27
    /*
    var b_rate2 = new Array(
        'LLｽｺｱ ﾘｽｸ調整 ﾘﾀｰﾝ 3年=1', // 1
        'LLｽｺｱ ﾘｽｸ調整 ﾘﾀｰﾝ 3年=2', // 2
        'LLｽｺｱ ﾘｽｸ調整 ﾘﾀｰﾝ 3年=3', // 3
        'LLｽｺｱ ﾘｽｸ調整 ﾘﾀｰﾝ 3年=4', // 4
        'LLｽｺｱ ﾘｽｸ調整 ﾘﾀｰﾝ 3年=5'  // 5
    );
    */
    var b_rate2 = new Array(
        'l2=1', // 1
        'l2=2', // 2
        'l2=3', // 3
        'l2=4', // 4
        'l2=5'  // 5
    );
    // レーティング（元本安定性）   condition28
    /*
    var b_rate3 = new Array(
        'LLｽｺｱ 元本安定性 3年=1',   // 1
        'LLｽｺｱ 元本安定性 3年=2',   // 2
        'LLｽｺｱ 元本安定性 3年=3',   // 3
        'LLｽｺｱ 元本安定性 3年=4',   // 4
        'LLｽｺｱ 元本安定性 3年=5'    // 5
    );
    */
    var b_rate3 = new Array(
        'l3=1',   // 1
        'l3=2',   // 2
        'l3=3',   // 3
        'l3=4',   // 4
        'l3=5'    // 5
    );
    // レーティング（経費率）   condition29
    /*
    var b_rate4 = new Array(
        'LLｽｺｱ 経費率 3年=1',   // 1
        'LLｽｺｱ 経費率 3年=2',   // 2
        'LLｽｺｱ 経費率 3年=3',   // 3
        'LLｽｺｱ 経費率 3年=4',   // 4
        'LLｽｺｱ 経費率 3年=5'    // 5
    );    
    */
    var b_rate4 = new Array(
        'l4=1',   // 1
        'l4=2',   // 2
        'l4=3',   // 3
        'l4=4',   // 4
        'l4=5'    // 5
    );

    // テーマ   condition25
    /*
    var b_theme = new Array(
        'テーマ like*ｲﾝﾃﾞｯｸｽ型*',      // 1
        'テーマ like*ﾌｧﾝﾄﾞｵﾌﾞﾌｫﾝｽﾞ*',  // 2
        'テーマ like*中小型株*',       // 3
        'テーマ like*業種･ﾃｰﾏ型*',     // 4
        'テーマ like*BRICs*',          // 5
        'テーマ like*REIT*'            // 6
    );
    */
    var b_theme = new Array(
        '*ｲﾝﾃﾞｯｸｽ型*',      // 1
        '*ﾌｧﾝﾄﾞｵﾌﾞﾌｫﾝｽﾞ*',  // 2
        '*中小型株*',       // 3
        '*業種･ﾃｰﾏ型*',     // 4
        '*BRICs*',          // 5
        '*REIT*'            // 6
    );
    

    // 投資地域(ファンド)   condition21
        var b_area = new Array(
        '投資地域(ファンド)=日本',          // 1
        '投資地域(ファンド)=ｱｼﾞｱ･ｵｾｱﾆｱ',    // 2
        '投資地域(ファンド)=ｴﾏｰｼﾞﾝｸﾞ',      // 3
        '投資地域(ファンド)=ｸﾞﾛｰﾊﾞﾙ',       // 4
        '投資地域(ファンド)=欧州',          // 5
        '投資地域(ファンド)=北米',           // 6
        'region3=BRICs'           // 7
    );


    // 分配金再投資コース   condition20
    var b_saitoushi = new Array(
        'null',                 // 0
        '再投資フラグ=1',       // 1
        '再投資フラグ!=1'       // 2
    );


    // 分配金   condition19
    var b_bunpai = new Array(
    '分配方法=毎月分配',       // 1
    '分配方法=隔月分配',       // 2
    '分配方法=年1回',       // 3
    '分配方法=年2回',    // 4
    '分配方法=年4回'     // 5
    );
    
    // 積立サービス対象銘柄   condition3
    var b_suishouFlag = new Array(
        'null',                 // 0
        'suishouFlag=1',         // 1
        'suishouFlag!=1'         // 2
        );
    var a_suishouFlag = new Array(
        'null',     // 0
        'S24_01',   // 1    suishouFlag=1
        'S24_02'    // 2    suishouFlag!=1
        );
    
    
    // 運用会社 condition7
    var b_company = new Array(
    '運用会社=朝日ﾗｲﾌ',         //1 
    '運用会社=ｱﾗｲｱﾝｽ',          //2
    '運用会社=ｲﾝﾍﾞｽｺ',          //3
    '運用会社=DIAM',            //4
    '運用会社=ｺﾞｰﾙﾄﾞﾏﾝ',        //5
    '運用会社=国際',            //6
    '運用会社=ｼｭﾛｰﾀﾞｰ',         //7
    '運用会社=新光',            //8
    '運用会社=新生',            //9
    '運用会社=ｽﾃｰﾄ',            //10
    '運用会社=ｽﾊﾟｰｸｽ',          //11
    '運用会社=住信AM',          //12
    '運用会社=ｿｼｴﾃ',            //13
    '運用会社=NKSJ',         //14
    '運用会社=大和',            //15
    '運用会社=大和住銀',        //16
    '運用会社=ﾄﾞｲﾁｪ',           //17
    '運用会社=東京海上',        //18
    '運用会社=ﾆｯｾｲ',            //19
    '運用会社=日興',            //20
    '運用会社=岡三',            //21
    '運用会社=野村',            //22 
    '運用会社=BNP',             //23
    '運用会社=PCA',             //24
    '運用会社=ﾋﾟｸﾃ',            //25
    '運用会社=FCAM',            //26
    '運用会社=ITCIP',           //27
    '運用会社=ﾌｨﾃﾞﾘﾃｨ',         //28
    '運用会社=ﾌｫﾙﾃｨｽ',          //29
    '運用会社=ブラックロック',  //30
    '運用会社=ﾌﾟﾙﾃﾞﾝ',          //31
    '運用会社=ﾍﾞｱﾘﾝｸﾞ',         //32
    '運用会社=MHAM',            //33
    '運用会社=三井住友',        //34
    '運用会社=三菱UFJAM',       //35
    '運用会社=ﾓﾙｶﾞﾝS',          //36
    '運用会社=安田',            //37
    '運用会社=ﾕﾅｲﾃｯﾄﾞ',         //38
    '運用会社=ﾗｯｾﾙ',            //39
    '運用会社=楽天',            //40
    '運用会社=AIG',             //41
    '運用会社=HSBC',            //42
    '運用会社=JPモルガン',      //43
    '運用会社=T＆D',            //44
    '運用会社=ｱｸｻ',             //45
    '運用会社=ﾌﾟﾗｻﾞ',           //46
    '運用会社=BNYメロン',       //47
    '運用会社=MDAM',            //48
    '運用会社=マニュライフ',    //49
    '運用会社=MFS',             //50
    '運用会社=フランクリン',    //51
    '運用会社=アバディーン',    //52
    '運用会社=トヨタ',          //53
    '運用会社=中央三井',        //54
    '運用会社=ｱﾑﾝﾃﾞｨ',      //55          //new 20101104
    '運用会社=ばんせい',        //56          //new 20101104
    '運用会社=ﾊﾟｲﾝﾌﾞﾘｯｼﾞ',  //57          //new 20101104
    '運用会社=明治安田',        //58          //new 20101104
    '運用会社=ING',        //59          //new 20101104
    '運用会社=LM',          //60          //new 20101104
    '運用会社=UBS',         //61          //new 20101104
    '運用会社=CAM'       //62          //new 20101104
    ); 

function showrep(code) {
    //day = new Date();
    //id = day.getTime();    
    //eval("page" + id + " = window.open('../detail/index.html?ID=" + code + "', '_top', 'toolbar=0,scrollbars=1,location=0,statusbar=1,menubar=0,resizable=1,width=660,height=720,left=30,top=30');");
    window.open('../detail/index.html?ID=' + code + '', '_top', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=660,height=720,left=30,top=30');
}

function searchDetailedNow(sendForm) {
    //ResetCondition();
    //キーワード/ファンド名
    sendForm['condition1'].value = null;
    if (sendForm['form-text-01'].value) {
        sendForm['condition1'].value = fund + "*" + sendForm['form-text-01'].value + "*";
    }       
    
    //積立    
    if (sendForm['form-checkbox-02'].checked)
        sendForm['condition2'].value = b_tumitate[1];
    else
        sendForm['condition2'].value = null;            
    
    //アセットタイプ
    var fields = new Array;
    if (sendForm['form-checkbox-03'].checked)
        fields.push(b_asset[0]);
    if (sendForm['form-checkbox-04'].checked)
        fields.push(b_asset[1]);
    if (sendForm['form-checkbox-05'].checked)
        fields.push(b_asset[2]);
    if (sendForm['form-checkbox-06'].checked)
        fields.push(b_asset[3]);
    if (sendForm['form-checkbox-07'].checked)
        fields.push(b_asset[4]);
    if (sendForm['form-checkbox-08'].checked)
        fields.push(b_asset[5]);
    if (sendForm['form-checkbox-09'].checked)
        fields.push(b_asset[6]);
    if (sendForm['form-checkbox-10'].checked)
        fields.push(b_asset[7]);
    pop = fields.toString()
    if (pop)
        sendForm['condition4'].value = pop;
    else
        sendForm['condition4'].value = null;

    
    //販売手数料
    if (sendForm['form-select-11'].value != 0) {
        var num = sendForm['form-select-11'].value;
        sendForm['condition5'].value = b_tesuuryo[num];
    } else
        sendForm['condition5'].value = null;
    

    //ファンド設定日
    if (sendForm['form-select-02'].value != 0) {
        var num = sendForm['form-select-02'].value;

        if (num == 1) {
            sendForm['condition8'].value = b_date[0];
            sendForm['condition9'].value = null;
        }
        else if (num == 2) {
            sendForm['condition8'].value = b_date[1];
            sendForm['condition9'].value = b_date[2];
        }
        else if (num == 3) {
            sendForm['condition8'].value = b_date[3];
            sendForm['condition9'].value = null;
        }
    }
    else{
            sendForm['condition8'].value = null;
            sendForm['condition9'].value = null;
    }
    
    //委託会社
    if (sendForm['form-select-01'].value != 0) {
        var num = sendForm['form-select-01'].value;
        sendForm['condition7'].value = b_company[num - 1];
    }
    else{
        sendForm['condition7'].value = b_company[num - 1] = null;
    }
    
    //協会分類
    if (sendForm['form-select-03'].value != 0) {
        var num = sendForm['form-select-03'].value;
        sendForm['condition10'].value = b_kyokai[num - 1];
    }
    else {
        sendForm['condition10'].value = null;
    }

    //純資産（億円）
    if (sendForm['form-text-02'].value) {
        sendForm['condition11'].value = b_shisan1 + sendForm['form-text-02'].value;
    } else {
        sendForm['condition11'].value = null;
    }
    if (sendForm['form-text-03'].value) {
        sendForm['condition12'].value = b_shisan2 + sendForm['form-text-03'].value;
    } else {
        sendForm['condition12'].value = null;
    }

    //信託報酬
    if (sendForm['form-select-04'].value != 0) {
        var num = sendForm['form-select-04'].value;
        if (num == 1) {
            sendForm['condition13'].value = b_houshu[0];
            sendForm['condition14'].value = 'null';
        }
        else if (num == 2) {
            sendForm['condition13'].value = b_houshu[1];
            sendForm['condition14'].value = b_houshu[2];
        }
        else if (num == 3) {
            sendForm['condition13'].value = b_houshu[3];
            sendForm['condition14'].value = 'null';
        }
    }
    else {
        sendForm['condition13'].value = null;
        sendForm['condition14'].value = null;
    }
    
    //トータルリターン
    if (sendForm['form-select-06'].value != 0) {
        var num1 = sendForm['form-select-05'].value;
        var num2 = sendForm['form-select-06'].value;
        if (num1 == 0) {
            if (num2 == 0) {
                sendForm['condition15'].value = 'null';
                sendForm['condition16'].value = 'null';
            }
            else if (num2 == 1) {
                sendForm['condition15'].value = b_return[1];
                sendForm['condition16'].value = 'null';
            }
            else if (num2 == 2) {
                sendForm['condition15'].value = b_return[2];
                sendForm['condition16'].value = b_return[3];
            }
            else if (num2 == 3) {
                sendForm['condition15'].value = b_return[4];
                sendForm['condition16'].value = b_return[5];
            }
            else if (num2 == 4) {
                sendForm['condition15'].value = b_return[6];
                sendForm['condition16'].value = 'null';
            }
        } else if (num1 == 1) {
            if (num2 == 0) {
                sendForm['condition15'].value = 'null';
                sendForm['condition16'].value = 'null';
            }
            else if (num2 == 1) {
                sendForm['condition15'].value = b_return[8];
                sendForm['condition16'].value = 'null';
            }
            else if (num2 == 2) {
                sendForm['condition15'].value = b_return[9];
                sendForm['condition16'].value = b_return[10];
            }
            else if (num2 == 3) {
                sendForm['condition15'].value = b_return[11];
                sendForm['condition16'].value = b_return[12];
            }
            else if (num2 == 4) {
                sendForm['condition15'].value = b_return[13];
                sendForm['condition16'].value = 'null';
            }
        } else if (num1 == 2) {
            if (num2 == 0) {
                sendForm['condition15'].value = 'null';
                sendForm['condition16'].value = 'null';
            }
            else if (num2 == 1) {
                sendForm['condition15'].value = b_return[15];
                sendForm['condition16'].value = 'null';
            }
            else if (num2 == 2) {
                sendForm['condition15'].value = b_return[16];
                sendForm['condition16'].value = b_return[17];
            }
            else if (num2 == 3) {
                sendForm['condition15'].value = b_return[18];
                sendForm['condition16'].value = b_return[19];
            }
            else if (num2 == 4) {
                sendForm['condition15'].value = b_return[20];
                sendForm['condition16'].value = 'null';
            }
        } else if (num1 == 3) {
            if (num2 == 0) {
                sendForm['condition15'].value = 'null';
                sendForm['condition16'].value = 'null';
            }
            else if (num2 == 1) {
                sendForm['condition15'].value = b_return[22];
                sendForm['condition16'].value = 'null';
            }
            else if (num2 == 2) {
                sendForm['condition15'].value = b_return[23];
                sendForm['condition16'].value = b_return[24];
            }
            else if (num2 == 3) {
                sendForm['condition15'].value = b_return[25];
                sendForm['condition16'].value = b_return[26];
            }
            else if (num2 == 4) {
                sendForm['condition15'].value = b_return[27];
                sendForm['condition16'].value = 'null';
            }
        } else if (num1 == 4) {
            if (num2 == 0) {
                sendForm['condition15'].value = 'null';
                sendForm['condition16'].value = 'null';
            }
            else if (num2 == 1) {
                sendForm['condition15'].value = b_return[29];
                sendForm['condition16'].value = 'null';
            }
            else if (num2 == 2) {
                sendForm['condition15'].value = b_return[30];
                sendForm['condition16'].value = b_return[31];
            }
            else if (num2 == 3) {
                sendForm['condition15'].value = b_return[32];
                sendForm['condition16'].value = b_return[33];
            }
            else if (num2 == 4) {
                sendForm['condition15'].value = b_return[34];
                sendForm['condition16'].value = 'null';
            }
        }
    }
    else {
        sendForm['condition15'].value = null;
        sendForm['condition16'].value = null;
    }

    //シャープレシオ
    if (sendForm['form-select-08'].value != 0) {
        var num1 = sendForm['form-select-07'].value;
        var num2 = sendForm['form-select-08'].value;

        if (num1 == 0) {
            if (num2 == 1) {
                sendForm['condition17'].value = b_ratio[1];
                sendForm['condition18'].value = 'null';
            }
            else if (num2 == 2) {
                sendForm['condition17'].value = b_ratio[2];
                sendForm['condition18'].value = b_ratio[3];
            }
            else if (num2 == 3) {
                sendForm['condition17'].value = b_ratio[4];
                sendForm['condition18'].value = b_ratio[5];
            }
            else if (num2 == 4) {
                sendForm['condition17'].value = b_ratio[6];
                sendForm['condition18'].value = 'null';
            }
        }
        else if (num1 == 1) {
            if (num2 == 1) {
                sendForm['condition17'].value = b_ratio[8];
                sendForm['condition18'].value = 'null';
            }
            else if (num2 == 2) {
                sendForm['condition17'].value = b_ratio[9];
                sendForm['condition18'].value = b_ratio[10];
            }
            else if (num2 == 3) {
                sendForm['condition17'].value = b_ratio[11];
                sendForm['condition18'].value = b_ratio[12];
            }
            else if (num2 == 4) {
                sendForm['condition17'].value = b_ratio[13];
                sendForm['condition18'].value = 'null';
            }
        }
        else if (num1 == 2) {
            if (num2 == 1) {
                sendForm['condition17'].value = b_ratio[15];
                sendForm['condition18'].value = 'null';
            }
            else if (num2 == 2) {
                sendForm['condition17'].value = b_ratio[16];
                sendForm['condition18'].value = b_ratio[17];
            }
            else if (num2 == 3) {
                sendForm['condition17'].value = b_ratio[18];
                sendForm['condition18'].value = b_ratio[19];
            }
            else if (num2 == 4) {
                sendForm['condition17'].value = b_ratio[20];
                sendForm['condition18'].value = 'null';
            }
        }
        else if (num1 == 3) {
            if (num2 == 1) {
                sendForm['condition17'].value = b_ratio[22];
                sendForm['condition18'].value = 'null';
            }
            else if (num2 == 2) {
                sendForm['condition17'].value = b_ratio[23];
                sendForm['condition18'].value = b_ratio[24];
            }
            else if (num2 == 3) {
                sendForm['condition17'].value = b_ratio[25];
                sendForm['condition18'].value = b_ratio[26];
            }
            else if (num2 == 4) {
                sendForm['condition17'].value = b_ratio[27];
                sendForm['condition18'].value = 'null';
            }
        }
        else if (num1 == 4) {
            if (num2 == 1) {
                sendForm['condition17'].value = b_ratio[29];
                sendForm['condition18'].value = 'null';
            }
            else if (num2 == 2) {
                sendForm['condition17'].value = b_ratio[30];
                sendForm['condition18'].value = b_ratio[31];
            }
            else if (num2 == 3) {
                sendForm['condition17'].value = b_ratio[32];
                sendForm['condition18'].value = b_ratio[33];
            }
            else if (num2 == 4) {
                sendForm['condition17'].value = b_ratio[34];
                sendForm['condition18'].value = 'null';
            }
        }
    }
    else {
        sendForm['condition17'].value = null;
        sendForm['condition18'].value = null;
    }
    

    //ミニ積立
    if (sendForm['form-checkbox-45'].checked)
        sendForm['condition3'].value = b_suishouFlag[1];
    else
        sendForm['condition3'].value = 'null';

    //分配金
    var fields = new Array;
    if (sendForm['form-checkbox-13'].checked)
        fields.push(b_bunpai[0]);
    if (sendForm['form-checkbox-14'].checked)
        fields.push(b_bunpai[1]);
    if (sendForm['form-checkbox-15'].checked)
        fields.push(b_bunpai[2]);
    if (sendForm['form-checkbox-16'].checked)
        fields.push(b_bunpai[3]);
    if (sendForm['form-checkbox-17'].checked)
        fields.push(b_bunpai[4]);    
    pop = fields.toString()
    if (pop)
        sendForm['condition19'].value = pop;
    else
        sendForm['condition19'].value = 'null';

    //分配金再投資コース
    if (sendForm['form-checkbox-46'].checked) {        
        sendForm['condition20'].value = b_saitoushi[1]
    }
    else {
        sendForm['condition20'].value = 'null';
    }

    //投資地域(ファンド)
    var fields = new Array;
    if (sendForm['form-checkbox-18'].checked)
        fields.push(b_area[0]);
    if (sendForm['form-checkbox-19'].checked)
        fields.push(b_area[1]);
    if (sendForm['form-checkbox-20'].checked)
        fields.push(b_area[2]);
    if (sendForm['form-checkbox-21'].checked)
        fields.push(b_area[3]);
    if (sendForm['form-checkbox-22'].checked)
        fields.push(b_area[4]);
    if (sendForm['form-checkbox-23'].checked)
        fields.push(b_area[5]);
    if (sendForm['form-checkbox-24'].checked)
        fields.push(b_area[6]);
    pop = fields.toString()
    if (pop)
        sendForm['condition21'].value = pop;
    else
        sendForm['condition21'].value = 'null';

    // テーマ
    ary = new Array();
    if (document.getElementById('form-checkbox-25').checked) {
        ary.push(b_theme[0]);
    }
    if (document.getElementById('form-checkbox-26').checked) {
        ary.push(b_theme[1]);
    }
    if (document.getElementById('form-checkbox-27').checked) {
        ary.push(b_theme[2]);
    }
    if (document.getElementById('form-checkbox-28').checked) {
        ary.push(b_theme[3]);
    }
    if (document.getElementById('form-checkbox-29').checked) {
        ary.push(b_theme[4]);
    }
    if (document.getElementById('form-checkbox-30').checked) {
        ary.push(b_theme[5]);
    }
    buff = ary.toString();
    if (buff) {
        buff = "テーマ like" + buff;
        document.getElementById('condition25').value = buff;
    } else {
        document.getElementById('condition25').value = 'null';
    }

    // レーティング（トータルリターン）
    ary = new Array();
    if (h_check1_1) {
        ary.push(b_rate1[0]);
    }
    if (h_check1_2) {
        ary.push(b_rate1[1]);
    }
    if (h_check1_3) {
        ary.push(b_rate1[2]);
    }
    if (h_check1_4) {
        ary.push(b_rate1[3]);
    }
    if (h_check1_5) {
        ary.push(b_rate1[4]);
    }
    buff = ary.toString();
    if (buff) {
        document.getElementById('condition26').value = buff;
    } else {
        document.getElementById('condition26').value = 'null';
    }
    // レーティング（リスク調整後リターン）
    ary = new Array();
    if (h_check2_1) {
        ary.push(b_rate2[0]);
    }
    if (h_check2_2) {
        ary.push(b_rate2[1]);
    }
    if (h_check2_3) {
        ary.push(b_rate2[2]);
    }
    if (h_check2_4) {
        ary.push(b_rate2[3]);
    }
    if (h_check2_5) {
        ary.push(b_rate2[4]);
    }
    buff = ary.toString();
    if (buff) {
        document.getElementById('condition27').value = buff;
    } else {
        document.getElementById('condition27').value = 'null';
    }
    // レーティング（元本安定性）
    ary = new Array();
    if (h_check3_1) {
        ary.push(b_rate3[0]);
    }
    if (h_check3_2) {
        ary.push(b_rate3[1]);
    }
    if (h_check3_3) {
        ary.push(b_rate3[2]);
    }
    if (h_check3_4) {
        ary.push(b_rate3[3]);
    }
    if (h_check3_5) {
        ary.push(b_rate3[4]);
    }
    buff = ary.toString();
    if (buff) {
        document.getElementById('condition28').value = buff;
    } else {
        document.getElementById('condition28').value = 'null';
    }
    // レーティング（経費率）
    ary = new Array();
    if (h_check4_1) {
        ary.push(b_rate4[0]);
    }
    if (h_check4_2) {
        ary.push(b_rate4[1]);
    }
    if (h_check4_3) {
        ary.push(b_rate4[2]);
    }
    if (h_check4_4) {
        ary.push(b_rate4[3]);
    }
    if (h_check4_5) {
        ary.push(b_rate4[4]);
    }
    buff = ary.toString();
    if (buff) {
        document.getElementById('condition29').value = buff;
    } else {
        document.getElementById('condition29').value = 'null';
    }


    //ベンチマーク（グループ）
    var fields = new Array;
    if (sendForm['form-checkbox-31'].checked)
        fields.push(b_benchg[0]);
    if (sendForm['form-checkbox-32'].checked)
        fields.push(b_benchg[1]);
    if (sendForm['form-checkbox-33'].checked)
        fields.push(b_benchg[2]);
    if (sendForm['form-checkbox-34'].checked)
        fields.push(b_benchg[3]);
    if (sendForm['form-checkbox-35'].checked)
        fields.push(b_benchg[4]);
    if (sendForm['form-checkbox-36'].checked)
        fields.push(b_benchg[5]);
    if (sendForm['form-checkbox-37'].checked)
        fields.push(b_benchg[6]);
    if (sendForm['form-checkbox-38'].checked)
        fields.push(b_benchg[7]);
    if (sendForm['form-checkbox-39'].checked)
        fields.push(b_benchg[8]);
    if (sendForm['form-checkbox-40'].checked)
        fields.push(b_benchg[9]);
    if (sendForm['form-checkbox-41'].checked)
        fields.push(b_benchg[10]);
    if (sendForm['form-checkbox-42'].checked)
        fields.push(b_benchg[11]);
    if (sendForm['form-checkbox-43'].checked)
        fields.push(b_benchg[12]);
    if (sendForm['form-checkbox-44'].checked)
        fields.push(b_benchg[13]);    
    pop = fields.toString()
    if (pop)
        sendForm['condition22'].value = pop;
    else
        sendForm['condition22'].value = 'null';

    //リッパーベンチマーク名
    if (sendForm['form-select-09'].value != 0) {
        var num = sendForm['form-select-09'].value;
        sendForm['condition23'].value = b_bench[num - 1];
    } else
        sendForm['condition23'].value = 'null';

    //リッパー分類    
    if (sendForm['form-select-10'].value != 0) {
        var num = sendForm['form-select-10'].value;
        sendForm['condition24'].value = b_lipper[num - 1];
    } else
        sendForm['condition24'].value = 'null';
    
    sendForm.method = "get";
    sendForm.action = "result.html";
    sendForm.submit();
}

function ResetCondition() {
    //var conditionForm = document.getElementById['searchCondition'];
    //var i = 1;
    //for (i = 1; i <= 16; i++)
    //conditionForm['condition' + i] = null;
}

function hideTable(object1) {

    object1.style.display = "none";
}

function NavigateTab1() {
    //check if already selected
    if (document.getElementById('table1').style.display == "block")
        return;

    //change the icon...
    document.getElementById('tab1-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-01-h.gif";
    document.getElementById('tab2-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-02-o.gif";
    document.getElementById('tab3-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-03-o.gif";
    document.getElementById('tab4-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-04-o.gif";
    document.getElementById('tab5-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-05-o.gif";
    document.getElementById('tab6-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-06-o.gif";

    //change the displayed table    
    hideTable(document.getElementById('table2'));
    hideTable(document.getElementById('table3'));
    hideTable(document.getElementById('table4'));
    hideTable(document.getElementById('table5'));
    hideTable(document.getElementById('table6'));

    var showForm = document.getElementById('table1');
    showForm.style.display = "block";
    document.getElementById('focus').value = "tab1";
}


function NavigateTab2() {
    //check if already selected
    if (document.getElementById('table2').style.display == "block")
        return;

    //change the icon...        
    document.getElementById('tab1-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-01-o.gif";
    document.getElementById('tab2-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-02-h.gif";
    document.getElementById('tab3-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-03-o.gif";
    document.getElementById('tab4-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-04-o.gif";
    document.getElementById('tab5-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-05-o.gif";
    document.getElementById('tab6-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-06-o.gif";

    //change the displayed table
    hideTable(document.getElementById('table1'));
    hideTable(document.getElementById('table3'));
    hideTable(document.getElementById('table4'));
    hideTable(document.getElementById('table5'));
    hideTable(document.getElementById('table6'));

    var showForm = document.getElementById('table2');
    showForm.style.display = "block";
    document.getElementById('focus').value = "tab2";
}

function NavigateTab3() {
    //check if already selected
    if (document.getElementById('table3').style.display == "block")
        return;

    //change the icon...        
    document.getElementById('tab1-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-01-o.gif";
    document.getElementById('tab2-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-02-o.gif";
    document.getElementById('tab3-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-03-h.gif";
    document.getElementById('tab4-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-04-o.gif";
    document.getElementById('tab5-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-05-o.gif";
    document.getElementById('tab6-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-06-o.gif";

    //change the displayed table
    hideTable(document.getElementById('table1'));
    hideTable(document.getElementById('table2'));
    hideTable(document.getElementById('table4'));
    hideTable(document.getElementById('table5'));
    hideTable(document.getElementById('table6'));

    var showForm = document.getElementById('table3');
    showForm.style.display = "block";
    document.getElementById('focus').value = "tab3";
}

function NavigateTab4() {
    //check if already selected
    if (document.getElementById('table4').style.display == "block")
        return;

    //change the icon...        
    document.getElementById('tab1-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-01-o.gif";
    document.getElementById('tab2-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-02-o.gif";
    document.getElementById('tab3-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-03-o.gif";
    document.getElementById('tab4-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-04-h.gif";
    document.getElementById('tab5-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-05-o.gif";
    document.getElementById('tab6-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-06-o.gif";

    //change the displayed table
    hideTable(document.getElementById('table1'));
    hideTable(document.getElementById('table2'));
    hideTable(document.getElementById('table3'));
    hideTable(document.getElementById('table5'));
    hideTable(document.getElementById('table6'));

    var showForm = document.getElementById('table4');
    showForm.style.display = "block";
    document.getElementById('focus').value = "tab4";
}

function NavigateTab5() {
    //check if already selected    
    if (document.getElementById('table5').style.display == "block")
        return;
    
    //change the icon...        
    document.getElementById('tab1-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-01-o.gif";
    document.getElementById('tab2-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-02-o.gif";
    document.getElementById('tab3-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-03-o.gif";
    document.getElementById('tab4-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-04-o.gif";
    document.getElementById('tab5-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-05-h.gif";
    document.getElementById('tab6-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-06-o.gif";

    //change the displayed table
    hideTable(document.getElementById('table1'));
    hideTable(document.getElementById('table2'));
    hideTable(document.getElementById('table3'));
    hideTable(document.getElementById('table4'));
    hideTable(document.getElementById('table6'));

    var showForm = document.getElementById('table5');
    showForm.style.display = "block";
    document.getElementById('focus').value = "tab5";
}

function NavigateTab6() {
    //check if already selected
    if (document.getElementById('table6').style.display == "block")
        return;

    //change the icon...
    document.getElementById('tab1-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-01-o.gif";
    document.getElementById('tab2-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-02-o.gif";
    document.getElementById('tab3-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-03-o.gif";
    document.getElementById('tab4-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-04-o.gif";
    document.getElementById('tab5-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-05-o.gif";
    document.getElementById('tab6-img').src = "/web/shared/images/nav-contents/nav-tab-01-result-06-h.gif";

    //change the displayed table
    hideTable(document.getElementById('table1'));
    hideTable(document.getElementById('table2'));
    hideTable(document.getElementById('table3'));
    hideTable(document.getElementById('table4'));
    hideTable(document.getElementById('table5'));    

    var showForm = document.getElementById('table6');
    showForm.style.display = "block";
    document.getElementById('focus').value = "tab6";
}

function pickCode_1(code, idx, action) {
    /*
    imgs = Array("img/fav_after.gif", "img/btn_fav_off.gif")
    temp = document.getElementById("myCode").src
    if (temp.indexOf(imgs[0]) == -1) {
    document.getElementById("myCode").src = imgs[0];
    document.getElementById("myCode2").src = imgs[0];
    } else {
    document.getElementById("myCode").src = imgs[1];
    document.getElementById("myCode2").src = imgs[1];
    }
    */

    
    if(action == "add"){
        window.open("http://www.fdcjapan.com/web/addCookie.asp?code=" + code + "&idx=" + idx + " ", "cookie", "toolbar=0,scrollbars=1,location=0,resizable=1,width=20,height=20,left=30,top=30", "");
        document.getElementById(idx).src = "/web/shared/images/button/btn-favoritefund-01.gif";                
        //eval("page" + id + " = window.open('http://www.fdcjapan.com/shared/include/asp_script/search/addCode.asp?code=" + code + "', '_top', 'toolbar=0,scrollbars=1,location=0,status=1,menubar=0,resizable=1,width=660,height=720,left=30,top=30');");        
    } else {
        window.open("http://www.fdcjapan.com/web/addCookie.asp?code=" + code + " ", "cookie", "", "");
        document.getElementById(idx).src = "/web/shared/images/button/btn-favoritefund-02.gif";
    }
    
    // /web/shared/images/button/btn-favoritefund-02.gif
    //frames['frame1'].location.href = 'addcode.asp?code=' + code;
}

function ClearArea() {
    //clear all the input....
    var searchForm = document.getElementById("searchCondition");
    
    
    //キーワード/ファンド名
    searchForm['form-text-01'].value = "";
    //純資産（億円）
    searchForm['form-text-02'].value = "";
    searchForm['form-text-03'].value = "";
    

    //委託会社
    searchForm['form-select-01'].value = "0";
    //ファンド設定日
    searchForm['form-select-02'].value = "0";
    //協会分類
    searchForm['form-select-03'].value = "0";
    //信託報酬
    searchForm['form-select-04'].value = "0";
    //トータルリターン
    searchForm['form-select-05'].value = "0";
    searchForm['form-select-06'].value = "0";
    //シャープレシオ
    searchForm['form-select-07'].value = "0";
    searchForm['form-select-08'].value = "0";
    //リッパーベンチマーク名
    searchForm['form-select-09'].value = "0";
    //リッパー分類
    searchForm['form-select-10'].value = "0";
    //販売手数料
    searchForm['form-select-11'].value = "0";
    

    //積立   
    //searchForm['form-checkbox-01'].checked = false;
    searchForm['form-checkbox-02'].checked = false;
    //アセットタイプ
    searchForm['form-checkbox-03'].checked = false;
    searchForm['form-checkbox-04'].checked = false;
    searchForm['form-checkbox-05'].checked = false;
    searchForm['form-checkbox-06'].checked = false;
    searchForm['form-checkbox-07'].checked = false;
    searchForm['form-checkbox-08'].checked = false;   

    //分配金
    searchForm['form-checkbox-13'].checked = false;
    searchForm['form-checkbox-14'].checked = false;
    searchForm['form-checkbox-15'].checked = false;
    searchForm['form-checkbox-16'].checked = false;
    searchForm['form-checkbox-17'].checked = false;
    //投資地域
    searchForm['form-checkbox-18'].checked = false;
    searchForm['form-checkbox-19'].checked = false;
    searchForm['form-checkbox-20'].checked = false;
    searchForm['form-checkbox-21'].checked = false;
    searchForm['form-checkbox-22'].checked = false;
    searchForm['form-checkbox-23'].checked = false;
    searchForm['form-checkbox-24'].checked = false;
    //テーマ
    searchForm['form-checkbox-25'].checked = false;
    searchForm['form-checkbox-26'].checked = false;
    searchForm['form-checkbox-27'].checked = false;
    searchForm['form-checkbox-28'].checked = false;
    searchForm['form-checkbox-29'].checked = false;
    searchForm['form-checkbox-30'].checked = false;
    //リッパーベンチマーク（グループ）
    searchForm['form-checkbox-31'].checked = false;
    searchForm['form-checkbox-32'].checked = false;
    searchForm['form-checkbox-33'].checked = false;
    searchForm['form-checkbox-34'].checked = false;
    searchForm['form-checkbox-35'].checked = false;
    searchForm['form-checkbox-36'].checked = false;
    searchForm['form-checkbox-37'].checked = false;
    searchForm['form-checkbox-38'].checked = false;
    searchForm['form-checkbox-39'].checked = false;
    searchForm['form-checkbox-40'].checked = false;
    searchForm['form-checkbox-41'].checked = false;
    searchForm['form-checkbox-42'].checked = false;
    searchForm['form-checkbox-43'].checked = false;
    searchForm['form-checkbox-44'].checked = false;
    //ミニ積立
    searchForm['form-checkbox-45'].checked = false;
    //分配金再投資コース
    searchForm['form-checkbox-46'].checked = false;
  
    
    h_check1_0 = false;
    h_check1_1 = false;
    h_check1_2 = false;
    h_check1_3 = false;
    h_check1_4 = false;
    h_check1_5 = false;
    h_check2_0 = false;
    h_check2_1 = false;
    h_check2_2 = false;
    h_check2_3 = false;
    h_check2_4 = false;
    h_check2_5 = false;
    h_check3_0 = false;
    h_check3_1 = false;
    h_check3_2 = false;
    h_check3_3 = false;
    h_check3_4 = false;
    h_check3_5 = false;
    h_check4_0 = false;
    h_check4_1 = false;
    h_check4_2 = false;
    h_check4_3 = false;
    h_check4_4 = false;
    h_check4_5 = false;
    
    checkStatus()
}

function ResetGIF(idx) {    
    document.getElementById(idx).src = "/web/shared/images/button/btn-favoritefund-02.gif";
}

function Compare(inval) {
    var compareForm = document.getElementById('compareCondition');
    
    var items = "";
    var cnt = 0;
    for (i = 0; i <= inval; i++) {
        var name = 'table_1_' + i
        if (document.getElementById(name).checked == true) {
            if (items != "")
                items = items + "_";
            items = items + document.getElementById(name).name;
            cnt++;
        }
    }
        
        
    if (cnt < 2) {
        window.alert('２件以上を選択して下さい。');
        return;
    }
    else if (cnt > 5) {
        window.alert('６件以上選択できません。選択した銘柄を減らしてください。');
        return;
    }

    window.location = "../comparison/index.html?codes="     + items;    
 }

var v_checkCounter = 0;
function checkCounter(inval) {
    if (v_checkCounter >= 5 && inval.checked) {
        alert("６件以上選択できません。選択した銘柄を減らしてください。");
        inval.checked = false;
        return;
    }

    if (inval.checked == true) {
        v_checkCounter++;
        checkOtherTextBox(inval.value)
    }
    else {
        v_checkCounter--;
        unCheckOtherTextBox(inval.value)
    }   

    //check other checkbox as well
}

function unCheckOtherTextBox(cnt) {
    document.getElementById('table_1_' + cnt).checked = false;
    document.getElementById('table_2_' + cnt).checked = false;
    document.getElementById('table_3_' + cnt).checked = false;
    document.getElementById('table_4_' + cnt).checked = false;
    document.getElementById('table_5_' + cnt).checked = false;
    document.getElementById('table_6_' + cnt).checked = false;        
}

function checkOtherTextBox(cnt) {
    document.getElementById('table_1_' + cnt).checked = true;
    document.getElementById('table_2_' + cnt).checked = true;
    document.getElementById('table_3_' + cnt).checked = true;
    document.getElementById('table_4_' + cnt).checked = true;
    document.getElementById('table_5_' + cnt).checked = true;
    document.getElementById('table_6_' + cnt).checked = true;
}

function popwindow(url) {
    window.open(url, '_top', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=660,height=720,left=30,top=30');
}

function changeRadio(inval)
{
   if(inval == 1)
	document.getElementById('form-radio-01-2').checked = false;
   else
document.getElementById('form-radio-01-1').checked = false;

}