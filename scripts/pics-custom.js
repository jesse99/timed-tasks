/* eslint no-unused-vars: "off" */

// Update this using a command line like this:
//    cd pics-custom; for f in *; do mv "$f" `echo $f | tr ' ' '_'`; done; cd -
//    ls -l pics-custom/* | sed -e 's/^.*pics-custom/pics-custom/' | sed 's/^/\t"/' | sed 's/$/",/'
const custom_pictures = [
	"pics-custom/1004x1245_1beff3949f5ea0f86994c9ab09572faf.jpg",
	"pics-custom/1005x1244_f856c2ce2cda15010c69af2dadec38e6.jpg",
	"pics-custom/1019x1253_1db4a19ce6849f8f1830efef026ceba4.jpg",
	"pics-custom/1112x1559_2a55c49a9150eb95a9e95c617ef97922.jpg",
	"pics-custom/1114x1499_8277165791130e81a569d04f11568705.jpg",
	"pics-custom/1157x1730_71246b1c4a315761c5cdb02c5c5ce529.jpg",
	"pics-custom/1170x1548_a8cc4f9d160a856685a91d59fba97790.jpg",
	"pics-custom/1170x1552_f58e630dc2ff9ee69c343f9a09c3dca9_(1).jpg",
	"pics-custom/1170x1558_06c8e02f98d2b73391c5c65581ece893.jpg",
	"pics-custom/1170x1564_fc9f3d9f57c496a1a45f83629c64bcba.jpg",
	"pics-custom/1170x1801_08711285033a3a4c8d756794cfa4ad45.jpg",
	"pics-custom/1200x1600_6a1cc4352449eb8028c8959b2205ba194836025e0039ba829df.jpg",
	"pics-custom/1200x1600_7b679f180338edcc4b6c6d48787460e0.jpg",
	"pics-custom/1200x1600_962fc12a1c312a6c1b82854f4c92a0ba.jpg",
	"pics-custom/1244x1600_3feea2a7919fbeebd8ff275889686bc7938405.jpg",
	"pics-custom/1255x1805_30477ea429cde4b9fc5737e41104b135661418.jpg",
	"pics-custom/1350x1687_3859157d0a364004ffd38545ca17ab92.jpg",
	"pics-custom/1350x1703_9c91f2a3a92a86198ad59f52f651c56d.jpg",
	"pics-custom/1350x1800_0f38a6fdeefd8db17e90a3fb7ef13e5e.jpg",
	"pics-custom/1350x1800_27375554ee20ec1c82cab90f6335e302_copy.jpg",
	"pics-custom/1350x1800_2e3959a20928815e7c4b09b0baee2234.jpg",
	"pics-custom/1350x1800_2e4b125c481e004b8b6b4888a415d27b.jpg",
	"pics-custom/1350x1800_3432a646c9426427095f23723b1f6814.jpg",
	"pics-custom/1350x1800_8e7d83b5078c3665be2eeab0550d454f.jpg",
	"pics-custom/1350x1800_954c521bdd68e2c0624e280d5d3ca97c.jpg",
	"pics-custom/1350x1800_b8a4fe3452a3fbf409665caf90433177.jpg",
	"pics-custom/1350x1800_c58d46bb513327a01906197c28c3502b.jpg",
	"pics-custom/1350x1800_f64d58e3686e23aa66bd7b9beb389b4b.jpg",
	"pics-custom/1350x1800_f72164412f919253b0cdbf1032a08ab6.jpg",
	"pics-custom/1556x2078_f46e1a898fdbc17e6dddccd13b46a614.jpg",
	"pics-custom/1574x2097_bd0d6b77d1aceab4669d9a9189ab73ee.jpg",
	"pics-custom/1579x1991_4022dc0237e2952749b3c41a9013852d.jpg",
	"pics-custom/1584x2160_c2c3b8e62c498010f4d3197ede135f0a113141.jpg",
	"pics-custom/1586x1982_69915efacf7e9ca672facfee5b967aae.jpg",
	"pics-custom/1595x2100_8cbd621987013e2505e75a760531d6ab.jpg",
	"pics-custom/1620x2160_1589cd134b9ac0ec36cfe6dad41f88f8.jpg",
	"pics-custom/1729x2160_ee03c17604c4724fa3a1746c9c6a422c2685815e05b94caf128.jpg",
	"pics-custom/2105x2788_5a00bbe0f5e3dffa81c5145c38e320c6.jpg",
	"pics-custom/2105x2788_d5c5780a333ac2cdaf7fc67c224b8705.jpg",
	"pics-custom/2110x2935_e45b2efd8fd36539855fb6841dbc72ff.jpg",
	"pics-custom/2153x2920_c8f34d8e4de6abe9f6a3cf8da5fdf58b.jpg",
	"pics-custom/2162x2975_114de484c25378d49575644df1fcf20e.jpg",
	"pics-custom/2231x3021_5df84f722e444d385496cea7a5c78f6f.jpg",
	"pics-custom/2262x2639_65514a07a036cb2e52f5fcbf6f98228c.jpg",
	"pics-custom/2309x3076_a279317b4f524ad7d4c16d610d21c3f6.jpg",
	"pics-custom/2316x2960_8d5099ed7aa3667c1ee9a263622e242d.jpg",
	"pics-custom/2316x3088_0280ba62f7dbb4fd5cee52348edc3c1c.jpg",
	"pics-custom/2316x3088_07f7c6dd26a0c50847a05e99b2b842b2.jpg",
	"pics-custom/2316x3088_0b7bebb3c1e3ad4aa4252423f4f94a59.jpg",
	"pics-custom/2316x3088_0bdcaab4b52c78ce5686c12d21ae9211.jpg",
	"pics-custom/2316x3088_129b8067d9b0be9edb8c10070f78cdb3.jpg",
	"pics-custom/2316x3088_18e1bd39741e342e66db6cf2032ca62c.jpg",
	"pics-custom/2316x3088_22ce163ac8a23b5bf5b9d4791a3ac43f.jpg",
	"pics-custom/2316x3088_2cadbde492b4fa101ce386beb464c0fd.jpg",
	"pics-custom/2316x3088_301cc28cda0abcd881e3fe5187040e6e.jpg",
	"pics-custom/2316x3088_32761992e679c13f45e6aeb2cf845891.jpg",
	"pics-custom/2316x3088_38f5a25dbd865db93eb7575b7260783b.jpg",
	"pics-custom/2316x3088_4316a9fa83af3104d206afcd1915f24d.jpg",
	"pics-custom/2316x3088_462d93e5aec4f51c0f968e333b81d704.jpg",
	"pics-custom/2316x3088_5d52b4bb6547d9b550c0c0d56515b4eb.jpg",
	"pics-custom/2316x3088_6850741abca51d9505f09842dd53040d.jpg",
	"pics-custom/2316x3088_6a3ff02228586e5a5bde3e7c0b02081c.jpg",
	"pics-custom/2316x3088_707b08d5ba919a5a3c7bf27807b94257.jpg",
	"pics-custom/2316x3088_7d5dd34e9ff02c2d736d65e279a3297a.jpg",
	"pics-custom/2316x3088_a26499acf1667c3cccbee01e165e94e7.jpg",
	"pics-custom/2316x3088_a323c6e4976334827e6e1e077e7d8d46.jpg",
	"pics-custom/2316x3088_ad979d770c36b810aa414c7761ee9a9c.jpg",
	"pics-custom/2316x3088_b7540fea4edbdcd782c1bead1d847cb5.jpg",
	"pics-custom/2316x3088_b7c77a768ff96d24fb6edf787e8ec4b3.jpg",
	"pics-custom/2316x3088_bc06046d12edcc8bdaa0025378866c81.jpg",
	"pics-custom/2316x3088_bfac4104fee24812e30dbdae5f77bca5.jpg",
	"pics-custom/2316x3088_c96f680a65f38ee987692f45e077c4ae.jpg",
	"pics-custom/2316x3088_f596290f94706fd49e50a7a4235e02f7_(2).jpg",
	"pics-custom/2328x3498_0dca3756d67c963467a918aeb9aa9c2d.jpg",
	"pics-custom/3024x4032_0bb2228dd0ea927e6490746bee62a29d.jpg",
	"pics-custom/3024x4032_73bea32f0a700531f45047e3de470976.jpg",
	"pics-custom/3024x4032_7e49569d370f39dd5949b9bd5293e11c_(2).jpg",
	"pics-custom/3024x4032_ec5614d5914cd8b0e5c2a785eae1be9c.jpg",
	"pics-custom/3625x2921_c43cb078938fe052e0a2760652cc5d36.jpg",
	"pics-custom/3840x5760_dc6e0aed2555dbe62712f3c71a0a7043.jpg",
	"pics-custom/56AFAF1D-9709-49FC-BF48-5FDD1FDFDC5E-2.JPG",
	"pics-custom/655x983_c237c5821c0c20b55924e8910abebcb1.jpg",
	"pics-custom/769x1029_4ef7c5469c44844f93997af44dea0a8f.jpg",
	"pics-custom/868x1165_121222eaee5410e77dbeacac358faa53.jpg",
	"pics-custom/881x1225_ce51f80b31235a0870d25f697afb1dee.jpg",
	"pics-custom/914x1161_517ff76c03b833d9352b1a1dbd934897.jpg",
	"pics-custom/916x1211_d81a3bdad1b7e95f0d6834e5ab76998e.jpg",
	"pics-custom/918x1178_d650984a47cb2bb7e1b2be645b8eadc9.jpg",
	"pics-custom/919x1233_e01b76b616c01d28be9a26bb0eeca316.jpg",
	"pics-custom/920x1232_5613e2b66b064929e842ca69dd4f61be.jpg",
	"pics-custom/924x1215_44284d2e765186bf7f710615cdb3380e.jpg",
	"pics-custom/934x1170_5d291ef199c185c55652939332e79b4c.jpg",
	"pics-custom/937x1138_90d1231ce9f439ce626de31ee3bbd866.jpg",
	"pics-custom/983x1229_a31ce9de99e6e75eff624ce563cd11ef.jpg",
	"pics-custom/984x1231_7ac8495047d608d7eee397d6cf56f388.jpg",
	"pics-custom/985x1224_825fd83fbcecc187840674849b4c8fb6.jpg",
	"pics-custom/986x1221_95f90a64ab16844d95c4df99532f093c.jpg",
	"pics-custom/988x1240_ba25d64ce5f32d877006c4f418f6b4d2.jpg",
	"pics-custom/994x1241_9f01e1e4cecbd940de393ccd8c379fe5.jpg",
	"pics-custom/994x1245_3fd98cf6f662a380029bcb85a6377353.jpg",
	"pics-custom/CDEQZSmUIAAQ9KN_2_copy_2-2.jpg",
	"pics-custom/CDEQZSmUIAAQ9KN_2_copy_3.jpg",
	"pics-custom/CDEQZSmUIAAQ9KN_2_copy_3_copy.jpg",
	"pics-custom/DZ3Z4OwUMAELWs3_2.jpg",
	"pics-custom/DZ3Z4OwUMAELWs3_2_2.jpg",
	"pics-custom/DZ3Z4OwUMAELWs3_2_copy.jpg",
	"pics-custom/DZ3Z4OwUMAELWs3_5_copy.jpg",
	"pics-custom/DZwAhPfU0AEg8Ag.jpg",
	"pics-custom/DlD_lNjUwAAzHLF.jpg",
	"pics-custom/IMG_3769.png",
	"pics-custom/IMG_4339-1536x2048.jpg",
	"pics-custom/IMG_5277.png",
	"pics-custom/IMG_5898.png",
	"pics-custom/IMG_6273.png",
	"pics-custom/Image-1-2.png",
	"pics-custom/Screen_Shot_2019-10-18_at_7.46.26_PM_4.png",
	"pics-custom/Screen_Shot_2019-10-18_at_7.46.26_PM_4_2.png",
	"pics-custom/Screen_Shot_2020-10-18_at_1.10.35_AM_copy_2.png",
];
