<template>
  <div class="sell-wrap lc-title">
    <div class="title">
      <span @click="goHistory"></span>定制买车
    </div>
      <div class="sell-list">
        <el-form :model="customeForm" :rules="rules" ref="customeForm" label-width="70px">
          <el-form-item label="品牌" prop="brandName">
            <el-select v-model="customeForm.brandName" placeholder="请选择品牌" @change="changeBrand">
              <el-option
                v-for="(brand,index) in brands"
                :key="brand"
                :label="brand"
                :value="brand">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车系" prop="seriesName">
            <el-select v-model="customeForm.seriesName" placeholder="请选择车系" @change="changeBrand">
              <el-option
                v-for="(item,index) in seriesList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车龄" prop="carAge">
            <el-select v-model="customeForm.carAge" placeholder="请选择车龄" @change="changeBrand">
              <el-option
                v-for="(age,index) in carAgeList"
                :key="age.value"
                :label="age.label"
                :value="age.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预算" prop="price">
            <el-input v-model.number="customeForm.price" placeholder="请输入预算">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="customeForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="customeForm.phone" placeholder="请输入手机"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="customeForm.code" placeholder="请输入验证码">
              <el-button slot="append" @click="flag && getCode('customeForm')">{{codeText}}</el-button>
            </el-input>
          </el-form-item>
          <div class="sell-btn-wrap">
            <a href="javascript:void(0)" class="sell-car-btn" @click="submitForm('customeForm')">有符合的车辆通知我</a>
          </div>
        </el-form>
      </div>
  </div>
</template>
<style lang="scss" type="text/scss">
  @import "../style/scss/_sellcar.scss";
  .el-input-group__append, .el-input-group__prepend{
    background: $BaseC;
    color:$BaseFont
  }
</style>
<script>
  export default {
    data () {
      return {
        data: {},
        brands: ['奥迪', '安驰', '阿斯顿马丁', '保时捷', '别克', '北京', '北汽', '奔腾', '奔驰', '宝沃', '宝马', '宝骏', '宝龙', '宾利', '巴博斯', '本田', '标致', '比亚迪', '比速', '传祺', '昌河', 'DS', '东南', '东风', '东风小康', '东风风度', '大众', '大发', '大迪', '大通', '帝豪', '道奇', '丰田', '富奇', '法拉利', '福特', '福田', '福迪', '菲亚特', '风神', '风行', '观致', '华北', '华普', '华泰', '华阳', '华颂', '哈弗', '哈飞', '幻速', '恒天', '汇众', '汉腾', '海格', '海马', '红旗', '黄海', '黑豹', 'Jeep', '九龙', '佳星', '吉利', '吉奥', '捷豹', '江南', '江淮', '江铃', '解放', '金杯', '金程', '克莱斯勒', '凯翼', '凯迪拉克', '卡威', '开瑞', '兰博基尼', '力帆', '劳斯莱斯', '林肯', '猎豹', '理念', '莲花', '路特斯', '路虎', '铃木', '陆风', '雷克萨斯', '雷诺', 'MG', 'MINI', '玛莎拉蒂', '美亚', '迈凯伦', '马自达', '纳智捷', '欧宝', '欧朗', '讴歌', '全球鹰', '启腾', '启辰', '奇瑞', '庆铃', '起亚', 'RUF', '日产', '瑞麒', '荣威', 'Smart', 'SPRINGO', '三菱', '双环', '双龙', '思铭', '斯威', '斯巴鲁', '斯柯达', '绅宝', '赛宝', '陕汽通家', '天马', '特斯拉', '腾势', '通用', '通田', '万丰', '五十铃', '五菱', '威兹曼', '威旺', '威麟', '沃尔沃', '夏利', '新凯', '新雅途', '现代', '西安奥拓', '西雅特', '雪佛兰', '雪铁龙', '一汽', '云雀', '依维柯', '扬子', '永源', '英伦', '英致', '英菲尼迪', '野马', '中兴', '中华', '中欧', '中顺', '众泰', '知豆', '长城', '长安', '长安商用'],
        seriesIndex: '',
        series: [['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'R8', 'TT'], ['威豹', '小公主', '雪豹'], ['DB11', 'DB9', 'DBS', 'ONE-77', 'Rapide', 'Vanquish', 'Vantage', 'Virage', 'Zagato'], ['911', '918', 'Boxster [博克斯特]', 'Cayenne [卡宴]', 'Cayman [卡曼]', 'Macan', 'Panamera [帕纳美拉]'], ['Enclave [昂科雷]', 'GL8', '凯越', '别克', '君威', '君越', '威朗', '昂科威', '昂科拉', '林荫大道', '英朗', '荣御', '赛欧'], ['BJ20', 'BJ40', 'BJ80', 'EC', 'ES', 'EU', 'EV', 'EX', 'E系列'], ['6460', 'BW007', '勇士', '北京212', '域胜007', '战旗', '旋风', '陆铃', '陆霸', '雷驰', '骑士'], ['B30', 'B50', 'B70', 'B90', 'X40', 'X80'], ['A-Class AMG [A级 AMG]', 'A-Class [A级]', 'AMG GT', 'B-Class [B级]', 'C-Class AMG [C级 AMG]', 'C-Class [C级]', 'CL-Class [CL级]', 'CLA AMG', 'CLA-Class [CLA级]', 'CLK-Class [CLK级]', 'CLS AMG', 'CLS-Class [CLS级]', 'C级', 'E-Class AMG [E级 AMG]', 'E-Class [E级]', 'E级', 'G-Class AMG [G级 AMG]', 'G-Class [G级]', 'GL AMG', 'GL-Class [GL级]', 'GLA-AMG [GLA级 AMG]', 'GLA-Class [GLA级]', 'GLA级', 'GLC-Class [GLC级]', 'GLC级', 'GLE', 'GLE AMG', 'GLK-Class [GLK级]', 'GLK级', 'GLS-Class AMG [GLS级 AMG]', 'GLS-Class [GLS级]', 'M-Class AMG [M级 AMG]', 'M-Class [M级]', 'MAYBACK S-Class [迈巴赫S级]', 'R-Class [R级]', 'S-Class AMG [S级 AMG]', 'S-Class [S级]', 'SL-Class AMG [SL级 AMG]', 'SL-Class [SL级]', 'SLC', 'SLK AMG', 'SLK-Class [SLK级]', 'SLS AMG', 'Viano [唯雅诺]', 'V级', '凌特', '唯雅诺', '威霆'], ['BX5', 'BX7'], ['1 Series [1系]', '2 Series [2系]', '2系', '3 Series [3系]', '3系', '4 Series [4系]', '5 Series [5系]', '5系', '6 Series [6系]', '7 Series [7系]', 'i3', 'i8', 'M Series [M系]', 'X1', 'X3', 'X4', 'X5', 'X6', 'Z4'], ['310', '330', '560', '610', '630', '730', '乐驰'], ['天马座', '菱惠', '菱骏', '菱麒', '霸道'], ['Arnage [雅致]', 'Bentayga [添越]', 'Continental [欧陆]', 'Flying Spur [飞驰]', 'Mulsanne [慕尚]'], ['CLS-Class [CLS级]', 'Forfour', 'Fortwo', 'M-Class [M级]', 'S-Class [S级]', 'SLK-Class [SLK级]'], ['CR-V', 'CR-Z', 'Fit [飞度]', 'Insight [音赛特]', 'UR-V', 'XR-V', '冠道', '凌派', '哥瑞', '奥德赛', '思域', '思迪', '思铂睿', '杰德', '歌诗图', '竞瑞', '缤智', '艾力绅', '锋范', '雅阁', '飞度'], ['2008', '206', '207', '3008', '301', '307', '308', '4008', '407', '408', '508', '607', 'RCZ'], ['e5', 'E6', 'F0', 'F3', 'F6', 'G3', 'G5', 'G6', 'L3', 'M6', 'S6', 'S7', 'S8', '元', '唐', '宋', '思锐', '福莱尔', '秦', '速锐'], ['M3', 'T3'], ['GA3', 'GA5', 'GA6', 'GA8', 'GS4', 'GS5', 'GS8', '传祺'], ['M70', 'Q25', 'Q35', '海豚', '海象', '爱迪尔', '福瑞达', '福运', '骏马'], ['DS 4S', 'DS 5LS', 'DS3', 'DS4', 'DS5', 'DS6'], ['DX3', 'DX7', 'V3菱悦', 'V5菱致', 'V6菱仕', '富利卡', '希旺', '得利卡', '菱利', '菱动', '菱帅'], ['东风轿跑车', '俊风', '小王子', '御风', '猛士', '途逸', '风神水星'], ['C系列', 'K系列', 'V系列', '风光'], ['MX5', 'MX6', '俊风', '奥丁', '帅客', '御轩', '锐骐'], ['Beetle [甲壳虫]', 'Caravelle [凯路威]', 'CC', 'Eos', 'Golf [高尔夫]', 'Magotan [迈腾]', 'Multivan [迈特威]', 'Phaeton [辉腾]', 'POLO', 'Scirocco [尚酷]', 'Sharan [夏朗]', 'Tiguan [途欢]', 'Touareg [途锐]', 'up!', '凌渡', '宝来', '帕萨特', '开迪', '捷达', '朗境', '朗行', '朗逸', '桑塔纳', '蔚领', '辉昂', '迈腾', '途安', '途昂', '途观', '速腾', '高尔', '高尔夫'], ['森雅'], ['都市威菱SUV', '都市骏马SUV', '霸道', '顺驰皮卡'], ['G10', 'T60', 'V80'], ['EC7', 'EC8'], ['Caliber [酷博]', 'Journey [酷威]', '凯领'], ['4Runner', '86', 'Alphard [埃尔法]', 'FJ Cruiser [FJ酷路泽]', 'Hiace [海狮]', 'Highlander [汉兰达]', 'Land Cruiser Prado [普拉多]', 'Land Cruiser [兰德酷路泽]', 'Previa [普瑞维亚]', 'RAV4', 'Sienna [塞纳]', 'Venza [威飒]', 'Wish [小霸王]', 'Zelas [杰路驰]', '兰德酷路泽', '凯美瑞', '卡罗拉', '威驰', '普拉多', '普锐斯', '柯斯达', '汉兰达', '特锐', '皇冠', '花冠', '逸致', '锐志', '陆地巡洋舰', '雅力士', '雷凌'], ['富奇', '驭虎'], ['360', '458', '488', '575', '599', '612', 'California', 'F12 Berlinetta', 'F430', 'FF', 'GTC4Lusso', 'LaFerrari'], ['Edge [锐界]', 'Expedition [征服者]', 'Explorer [探险者]', 'Fiesta [嘉年华]', 'Focus [福克斯]', 'Mustang [野马]', '全顺', '嘉年华', '撼路者', '福克斯', '福睿斯', '翼搏', '翼虎', '蒙迪欧', '途睿欧', '金牛座', '锐界', '麦柯斯S-MAX'], ['传奇', '伽途', '图雅诺', '拓陆者', '萨普', '萨瓦纳', '蒙派克', '迷迪', '风景'], ['小超人', '探索者', '揽福', '雄师', '飞越'], ['500', 'Bravo [博悦]', 'Freemont [菲跃]', 'Linea [领雅]', '周末风', '派力奥', '派朗', '致悦', '菲翔', '西耶那'], ['A30', 'A60', 'A9', 'AX3', 'AX5', 'AX7', 'E30', 'H30', 'L60', 'S30'], ['CM7', 'F600', 'S500', 'SX6', '景逸', '菱智', '菱越', '菱通', '风行'], ['观致3', '观致5'], ['腾狮', '超赛', '醒狮'], ['M203', '朗风', '杰士达美鹿', '海域', '海尚', '海悦', '海景', '海炫', '海迅', '海锋', '飓风', '飙风'], ['B11', 'iEV230', 'XEV260', '吉田', '圣达菲', '宝利格', '特拉卡', '路盛E70', '路盛E80'], ['五菱'], ['华颂7'], ['H1', 'H2', 'H5', 'H6', 'H7', 'H8', 'H9'], ['中意', '松花江', '民意', '百利', '赛豹', '赛马', '路宝', '路尊大霸王', '路尊小霸王', '骏意'], ['H2', 'H3', 'H6', 'S2', 'S3', 'S5', 'S6'], ['途腾'], ['伊思坦纳', '德驰'], ['X7'], ['H5C', 'H5V', 'H6C', 'H6V', 'H7V', '大海狮', '御骏', '龙威'], ['323', 'M3', 'M6', 'M8', 'S5', 'S7', 'V70', '丘比特', '普力马', '欢动', '海福星', '海马3', '海马王子', '爱尚', '福仕达', '福美来', '福美来MPV', '骑士'], ['H7', 'L5', '世纪星', '旗舰', '明仕', '盛世', '红旗', '红旗HQ3'], ['N1', '傲骏', '傲龙', '大柴神', '小柴神', '挑战者', '旗胜', '瑞途', '翱龙', '领航者'], ['旅行家', '黑豹'], ['Cherokee [自由光]', 'Commander [指挥官]', 'Compass [指南者]', 'Grand Cherokee [大切诺基]', 'Jeep2500', 'Jeep2700', 'Patriot [自由客]', 'Wrangler [牧马人]', '切诺基', '城市猎人', '大切诺基', '指南者', '自由侠', '自由光'], ['九龙'], ['幸福使者'], ['EC8', 'GX7', 'SC3', '优利欧', '博瑞', '博越', '帝豪', '海景', '熊猫', '美人豹', '美日', '自由舰', '豪情', '豪情SUV', '远景', '远景SUV', '金刚'], ['E美', 'GP150', 'GS50', 'GX6', '伊美', '凯旋SUV', '凯睿', '奥轩', '帅凌', '帅威', '帅舰', '帅豹', '帅驰', '星旺', '星朗', '财运'], ['F-PACE', 'F-Type', 'S-Type', 'XE', 'XF', 'XJ', 'XK'], ['传奇', '奥拓', '精灵', '风光'], ['iEV', '同悦', '和悦', '宾悦', '帅铃', '悦悦', '星锐', '瑞铃', '瑞风', '瑞驰', '瑞鹰'], ['域虎', '宝典', '宝威', '江铃轻卡', '驭胜', '骐铃'], ['解放陆豹'], ['750', 'S50', 'T30', 'T32', '大力神', '大海狮', '小海狮', '智尚', '海星', '海狮', '蒂阿兹', '金典', '锐驰', '阁瑞斯', '雷龙', '霸道'], ['赛风', '金程之星'], ['300', 'Grand Voyager [大捷龙]', '大捷龙', '铂锐'], ['C3', 'V3', 'X3'], ['ATS', 'CT6', 'CTS', 'Escalade [凯雷德]', 'SRX', 'XT5', 'XTS', '赛威SLS'], ['K1', 'K150', 'W1'], ['K50', 'K60', '优优', '优劲', '优派', '优翼', '优胜', '优雅', '开瑞3', '杰虎'], ['Aventador [埃文塔多]', 'Gallardo [盖拉多]', 'Huracan', 'Murcielago [蝙蝠]', 'Reventon [雷文顿]'], ['320', '330', '520', '530', '620', '630', '720', '820', 'X50', 'X60', 'X80', '丰顺', '乐途', '兴顺', '福顺', '轩朗', '迈威'], ['Ghost [古思特]', 'Phantom [幻影]', 'Wraith [魅影]'], ['Continental [大陆]', 'MKC', 'MKX', 'MKZ', 'Navigator [领航员]'], ['CS10', 'CS6', 'CS7', 'CT5', 'CT7', 'Q6', '奇兵', '飞腾', '骐菱', '黑金刚'], ['S1'], ['L3', 'L5', '竞悦', '竞速'], ['Elise', 'Evora', 'Exige'], ['Defender [卫士]', 'Discovery Sport [发现神行]', 'Discovery [发现]', 'Freelander [神行者]', 'Range Rover Evoque [揽胜极光]', 'Range Rover Sport [揽胜运动版]', 'Range Rover [揽胜]', '发现神行', '揽胜极光'], ['Grand Vitara [超级维特拉]', 'Jimny [吉姆尼]', 'Kizashi [凯泽西]', 'Swift [速翼特]', '利亚纳', '北斗星', '启悦', '天语SX4', '天语·尚悦', '奥拓', '昌铃王', '派喜', '浪迪', '维特拉', '羚羊', '锋驭', '雨燕'], ['X5', 'X6', 'X7', 'X8', 'X9', '新饰界', '风华', '风尚'], ['CT', 'ES', 'GS', 'GX', 'IS', 'LS', 'LX', 'NX', 'RC', 'RX', 'SC'], ['Captur [卡缤]', 'Fluence [风朗]', 'Koleos [科雷傲]', 'Laguna [拉古娜]', 'Latitude [纬度]', 'Megane [梅甘娜]', 'Scenic [风景]', 'Talisman [塔利斯曼]', '科雷傲', '科雷嘉'], ['MG GS', 'MG GT', 'MG ZS', 'MG3', 'MG5', 'MG6', 'MG7', 'MGTF'], ['Cabrio', 'Clubman', 'Countryman', 'Coupe', 'Mini', 'Mini 5-Door', 'Paceman', 'Roadster'], ['Ghibli', 'GranCabrio', 'GT', 'Levante', 'Quattroporte [总裁]'], ['奇兵', '奇骏', '海狮', '顺风'], ['12C', '540C', '570', '625C', '650S'], ['CX-4', 'CX-5', 'CX-7', 'CX-9', 'Mazda3 [马自达3]', 'Mazda5 [马自达5]', 'Mazda6 [马自达6]', 'MX-5', 'RX-8', '马自达2', '马自达3', '马自达6', '马自达8'], ['5 Sedan', 'MASTER CEO', '优6 SUV', '大7 MPV', '大7 SUV', '锐3'], ['Antara [安德拉]', 'Astra [雅特]', 'Insignia [英速亚]', 'Meriva [麦瑞纳]', 'Vectra [威达]', 'Zafira [赛飞利]'], ['欧朗'], ['CDX', 'ILX', 'MDX', 'RDX', 'RL', 'RLX', 'TL', 'TLX', 'ZDX'], ['GC7', 'GX2', 'GX7', '中国龙', '熊猫', '自由舰', '远景'], ['EX80', 'M70', 'V60'], ['D50', 'R30', 'R50', 'T70', 'T90', '晨风'], ['A1', 'A3', 'A5', 'E3', 'E5', 'eQ', 'eQ1', 'QQ', 'V5', '东方之子', '旗云', '爱卡', '瑞虎', '艾瑞泽', '风云', '风云2'], ['庆铃皮卡', '竞技者'], ['Borrego [霸锐]', 'Cadenza [凯尊]', 'Carens [佳乐]', 'Carnival [嘉华]', 'K2', 'K3', 'K4', 'K5', 'K9', 'KX3', 'KX5', 'KX7', 'Niro [极睿]', 'Shuma [速迈]', 'Sorento [索兰托]', 'VQ [威客]', '千里马', '嘉华', '普莱特', '智跑', '狮跑', '福瑞迪', '秀尔', '赛拉图', '远舰', '锐欧'], ['CTR', 'XL'], ['350Z', '370Z', 'Civilian [碧莲]', 'D22皮卡', 'Fuga [风雅]', 'GT-R', 'NV200', 'Patrol [途乐]', 'Quest [贵士]', 'ZN6493多功能商务车', '凯普斯达', '天籁', '奇骏', '帕拉丁', '帕拉骐', '楼兰', '玛驰', '蓝鸟', '西玛', '轩逸', '逍客', '阳光', '颐达', '骊威', '骏逸', '骐达'], ['G3', 'G5', 'G6', 'M1', 'M5', 'X1'], ['350', '360', '550', '750', '950', 'E50', 'RX5', 'W5'], ['Forfour', 'Fortwo'], ['SPRINGO'], ['ASX [劲炫]', 'ASX劲炫', 'Grandis [格蓝迪]', 'Lancer Evolution [蓝瑟 翼豪陆神]', 'Lancer [蓝瑟]', 'Outlander [欧蓝德]', 'Pajero [帕杰罗]', '君阁', '帕杰罗', '帕杰罗速跑', '戈蓝', '欧蓝德', '翼神', '菱绅', '蓝瑟', '风迪思'], ['SCEO', '小贵族', '来宝', '来旺'], ['Actyon [爱腾]', 'Chairman [主席]', 'Korando [柯兰多]', 'Kyron [享御]', 'Rexton [雷斯特]', 'Rodius [路帝]', 'Tivolan [蒂维拉]', 'XLV [途凌]'], ['思铭'], ['X7'], ['BRZ', 'Forester [森林人]', 'Impreza [翼豹]', 'Legacy [力狮]', 'Outback [傲虎]', 'Tribeca [驰鹏]', 'XV'], ['Octavia [明锐]', 'Superb [速派]', 'Yeti', 'Yeti [野帝]', '昊锐', '明锐', '昕动', '昕锐', '晶锐', '速派'], ['CC', 'D20', 'D50', 'D60', 'D80', 'X25', 'X35', 'X55', 'X65', '绅宝'], ['赛宝'], ['福家', '龙锐'], ['海狮', '英雄', '风锐', '风驰', '骏驰'], ['Model S', 'Model X'], ['腾势'], ['坤程'], ['阁罗'], ['万丰商务车', '万丰皮卡', '泰威', '速威'], ['D-MAX', 'mu-X', '瑞迈'], ['PN系列货车', '五菱之光', '兴旺', '宏光', '小旋风', '征程', '扬光', '荣光', '鸿途'], ['MF4', 'MF5'], ['007', '205', '306', '307', 'M20', 'M30', 'M35', 'M50F', 'S50', 'T205-D'], ['H3', 'H5', 'V5', 'X5'], ['C30', 'C70', 'S40', 'S60', 'S80', 'S90', 'V40', 'V60', 'XC60', 'XC90'], ['夏利', '雅酷'], ['凯胜', '新凯之星', '新凯商务车', '新凯靓星', '都市之星'], ['优尼柯', '君达', '新雅途'], ['Azera [雅尊]', 'Coupe [酷派]', 'Equus [雅科仕]', 'Genesis [捷恩斯]', 'Grand SantaFe [格越]', 'Grand SantaFe [格锐]', 'H-1 [辉翼]', 'i30', 'ix25', 'ix35', 'Rohens Coupe [劳恩斯酷派]', 'Rohens [劳恩斯]', 'Santa Fe [胜达]', 'Sonata [索纳塔]', 'Veloster [飞思]', 'Veracruz [维拉克斯]', '伊兰特', '名图', '名驭', '悦纳', '瑞奕', '瑞纳', '索纳塔', '胜达', '途胜', '雅绅特'], ['西安奥拓'], ['Alhambra [欧悦搏]', 'Ibiza [伊比飒]', 'Leon'], ['Camaro [科迈罗]', 'Captiva [科帕奇]', 'Spark [斯帕可]', 'Volt [沃蓝达]', '乐风', '乐驰', '乐骋', '创酷', '开拓者', '景程', '爱唯欧', '科帕奇', '科沃兹', '科鲁兹', '赛欧', '迈锐宝'], ['C2', 'C3-XR', 'C4', 'C4世嘉', 'C5', 'C6', 'Picasso [毕加索]', '世嘉', '凯旋', '富康', '毕加索', '爱丽舍', '赛纳'], ['AV6', '佳宝', '佳宝T系列', '佳宝V系列', '威乐', '威姿', '威志', '森雅M80', '森雅R7', '森雅S80', '福星', '自由风', '骏派'], ['云雀'], ['依维柯', '宝迪', '康果', '康驾', '得意', '快运王', '都灵V'], ['金麒麟', '长丰DUV', '飞扬', '飞扬皮卡', '飞铃'], ['A380', '庄威', '永源五星', '猎鹰', '风景线', '飞碟UFO'], ['SC3', 'SC5', 'SC6', 'SC7', 'SX7', 'TX4', '金刚', '金鹰'], ['727', '737', 'G3', 'G5'], ['ESQ', 'EX', 'FX', 'G', 'JX', 'M', 'Q50', 'Q60', 'Q70', 'QX', 'QX30', 'QX50', 'QX60', 'QX70', 'QX80'], ['F10', 'F12', 'F16', 'F99', 'T70'], ['C3', 'GX3', '万禧龙', '威虎', '旗舰', '无限', '田野', '福星', '老虎', '长铃', '领主', '驰野'], ['H220', 'H230', 'H3', 'H320', 'H330', 'H530', 'V3', 'V5', '中华', '中华豚', '尊驰', '酷宝', '骏捷'], ['尊致', '尊逸', '尊铂'], ['中顺世纪'], ['008', 'E20(知豆)', 'E200', 'M300', 'SR7', 'SR9', 'T200', 'T600', 'V10', 'Z100', 'Z200', 'Z300', 'Z500', 'Z560', 'Z700', '云100', '大迈X5', '大迈X7', '江南TT', '芝麻E30'], ['D1', 'D2'], ['C20R', 'C30', 'C50', 'M2', 'M4', 'V80', '凌傲', '哈弗', '哈弗H3', '哈弗H5', '哈弗H6', '哈弗M1', '哈弗M2', '哈弗M4', '哈弗派', '嘉誉', '大脚兽', '炫丽', '赛弗', '赛影', '赛酷', '赛铃', '赛骏', '酷熊', '金迪尔', '长城精灵', '风骏'], ['CS15', 'CS35', 'CS75', 'CS95', 'CX20', 'CX30', '奔奔', '志翔', '悦翔', '杰勋', '睿骋', '致尚', '逸动'], ['CM8', 'CX70', 'V5', '尊行', '星光', '星韵', '欧力威', '欧尚', '欧诺', '欧雅', '睿行', '神骐', '绿色新星', '运动星', '运通', '都市彩虹', '金牛星', '镭蒙', '长安之星', '长安星卡', '雪虎']],
        seriesList: {},
        carAgeList: [{
          value: '1',
          label: '1年以下'
        }, {
          value: '2',
          label: '2年以下'
        }, {
          value: '3',
          label: '3年以下'
        }, {
          value: '4',
          label: '4年以下'
        }, {
          value: '5',
          label: '5年以下'
        }, {
          value: '6',
          label: '6年以下'
        }, {
          value: '7',
          label: '7年以下'
        }, {
          value: '8',
          label: '8年以下'
        }, {
          value: '不限',
          label: '不限'
        }
        ],
        brandName: '',
        seriesName: '',
        flag: true,
        codeText: '获取验证码',
        customeForm: {
          brandName: '',
          seriesName: '',
          carAge: '',
          price: '',
          name: '',
          phone: '',
          code: ''
        },
        rules: {
          price: [
            {type: 'number', message: '请填写正确的预算', trigger: 'blur'},
            { type: 'number', min: 0, max: 10000, message: '请填写0-9999的预算', trigger: 'blur' }
          ],
          phone: [
            { required: true, pattern: /^(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/, message: '手机号格式错误', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        }
      }
    },
    mounted: function () {
    },
    methods: {
      goHistory () {
        this.$router.go(-1)
      },
      changeBrand (val) {
        var index = this.brands.indexOf(val)
        if (index === -1) {
          return false
        }
        this.customeForm.seriesName = ''
        this.seriesList = this.series[index]
      },
      getCode (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax({
              method: 'post',
              url: '/phoneValidCode',
              data: this.$qs.stringify(this.customeForm)
            })
              .then(function (response) {
                if (response.data === undefined || response.data === null) {
                  return alert('获取验证码失败')
                }
                if (response.data.errorCode === 0) {
                  this.timer(60)
                } else {
                  alert(response.data.errorText)
                }
              })
              .catch(function (error) {
                console.log(error)
              })
            console.log(this.$qs.stringify(this.customeForm))
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      timer (wait) {
        if (wait === 0) {
          this.codeText = '获取验证码'
          wait = 60
          this.flag = true
        } else {
          this.flag = false
          this.codeText = wait + '秒后重新获取'
          wait--
          setTimeout(function () {
            this.timer(wait)
          }.bind(this), 1000)
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax({
              method: 'post',
              url: '/buy/buyPersonal',
              data: this.$qs.stringify(this.customeForm)
            })
              .then(function (response) {
                if (response.data.errorCode === 0) {
                  alert('提交成功')
                } else {
                  alert('提交失败')
                }
              })
              .catch(function (error) {
                console.log(error)
              })
            console.log(this.$qs.stringify(this.customeForm))
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
