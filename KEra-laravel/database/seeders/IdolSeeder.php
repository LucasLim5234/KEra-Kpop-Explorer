<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class IdolSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('idols')->truncate();
        DB::table('idols')->insert([
            // 30 legit Kpop groups, each with a reliable image, members, discography, awards, fandom, etc.
            [
                'name' => 'BTS',
                'company' => 'HYBE (Big Hit Music)',
                'debut_year' => 2013,
                'thumbnail' => 'https://wallpapers.com/images/hd/student-bts-group-photo-dco2ywc1l2myr1ks.jpg',
                'fandom_name' => 'ARMY',
                'members' => json_encode(['RM', 'Jin', 'Suga', 'J-Hope', 'Jimin', 'V', 'Jungkook']),
                'discography' => json_encode(['2 Cool 4 Skool', 'Wings', 'Love Yourself: Tear', 'Map of the Soul: 7', 'BE', 'Proof']),
                'awards' => json_encode(['Billboard Music Awards', 'American Music Awards', 'Mnet Asian Music Awards', 'Melon Music Awards', 'Golden Disc Awards']),
                'description' => 'BTS is a seven-member South Korean boy band formed in 2013, known for their global influence and record-breaking achievements.'
            ],
            [
                'name' => 'BLACKPINK',
                'company' => 'YG Entertainment',
                'debut_year' => 2016,
                'thumbnail' => 'https://a-static.besthdwallpaper.com/blackpink-girl-group-members-rose-lisa-jennie-jisoo-wallpaper-1440x1080-105895_22.jpg',
                'fandom_name' => 'BLINK',
                'members' => json_encode(['Jisoo', 'Jennie', 'Rosé', 'Lisa']),
                'discography' => json_encode(['Square One', 'Square Up', 'Kill This Love', 'The Album', 'Born Pink']),
                'awards' => json_encode(['MTV Video Music Awards', 'Golden Disc Awards', 'Seoul Music Awards', 'Mnet Asian Music Awards']),
                'description' => 'BLACKPINK is a four-member South Korean girl group formed by YG Entertainment, recognized for their international success and powerful performances.'
            ],
            [
                'name' => 'TWICE',
                'company' => 'JYP Entertainment',
                'debut_year' => 2015,
                'thumbnail' => 'https://www.allkpop.com/upload/2022/03/content/171233/web_data/allkpop_1647535209_untitled-1.jpg',
                'fandom_name' => 'ONCE',
                'members' => json_encode(['Nayeon', 'Jeongyeon', 'Momo', 'Sana', 'Jihyo', 'Mina', 'Dahyun', 'Chaeyoung', 'Tzuyu']),
                'discography' => json_encode(['The Story Begins', 'Twicetagram', 'Fancy You', 'Feel Special', 'Eyes Wide Open', 'Formula of Love: O+T=<3']),
                'awards' => json_encode(['Golden Disc Awards', 'Mnet Asian Music Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'TWICE is a nine-member South Korean girl group formed by JYP Entertainment, known for their catchy songs and energetic choreography.'
            ],
            [
                'name' => 'EXO',
                'company' => 'SM Entertainment',
                'debut_year' => 2012,
                'thumbnail' => 'https://kpopheart.com/wp-content/uploads/2020/12/Exo-1400x700.jpg',
                'fandom_name' => 'EXO-L',
                'members' => json_encode(['Xiumin', 'Suho', 'Lay', 'Baekhyun', 'Chen', 'Chanyeol', 'D.O.', 'Kai', 'Sehun']),
                'discography' => json_encode(['XOXO', 'Exodus', 'The War', 'Don’t Mess Up My Tempo', 'Obsession']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Mnet Asian Music Awards', 'Asia Artist Awards']),
                'description' => 'EXO is a nine-member South Korean-Chinese boy band formed by SM Entertainment, acclaimed for their vocal and dance performances.'
            ],
            [
                'name' => 'Red Velvet',
                'company' => 'SM Entertainment',
                'debut_year' => 2014,
                'thumbnail' => 'https://tse4.mm.bing.net/th/id/OIP.kXrPs_ldNojKhNh4kpX_XgHaDt?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
                'fandom_name' => 'ReVeluv',
                'members' => json_encode(['Irene', 'Seulgi', 'Wendy', 'Joy', 'Yeri']),
                'discography' => json_encode(['Ice Cream Cake', 'The Red', 'Perfect Velvet', 'The ReVe Festival', 'Queendom']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Mnet Asian Music Awards', 'Asia Artist Awards']),
                'description' => 'Red Velvet is a five-member South Korean girl group formed by SM Entertainment, known for their versatile music and concepts.'
            ],
            [
                'name' => 'SEVENTEEN',
                'company' => 'Pledis Entertainment',
                'debut_year' => 2015,
                'thumbnail' => 'https://www.allkpop.com/upload/2021/07/content/121458/web_data/allkpop_1626116297_c47850005840a2526ec4664961bfa086.jpg',
                'fandom_name' => 'CARAT',
                'members' => json_encode(['S.Coups', 'Jeonghan', 'Joshua', 'Jun', 'Hoshi', 'Wonwoo', 'Woozi', 'DK', 'Mingyu', 'The8', 'Seungkwan', 'Vernon', 'Dino']),
                'discography' => json_encode(['17 Carat', 'Love&Letter', 'Teen, Age', 'An Ode', 'Face the Sun']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards', 'Mnet Asian Music Awards']),
                'description' => 'SEVENTEEN is a thirteen-member South Korean boy band formed by Pledis Entertainment, praised for their self-producing skills and synchronized performances.'
            ],
            [
                'name' => 'GOT7',
                'company' => 'JYP Entertainment',
                'debut_year' => 2014,
                'thumbnail' => 'https://www.nme.com/wp-content/uploads/2024/12/got7-11-anniversary-album-kakao-ent-201224.jpg',
                'fandom_name' => 'IGOT7',
                'members' => json_encode(['JB', 'Mark', 'Jackson', 'Jinyoung', 'Youngjae', 'BamBam', 'Yugyeom']),
                'discography' => json_encode(['Identify', 'Flight Log: Turbulence', '7 for 7', 'Present: YOU', 'DYE']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'GOT7 is a seven-member South Korean boy band formed by JYP Entertainment, known for their energetic performances and international appeal.'
            ],
            [
                'name' => 'MAMAMOO',
                'company' => 'RBW',
                'debut_year' => 2014,
                'thumbnail' => 'https://assets01.sdd1.ch/assets/lbwp-cdn/kpop-info/files/1605775467/mamamoo.jpg',
                'fandom_name' => 'MooMoo',
                'members' => json_encode(['Solar', 'Moonbyul', 'Wheein', 'Hwasa']),
                'discography' => json_encode(['Hello', 'Melting', 'Purple', 'Reality in Black', 'WAW']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Mnet Asian Music Awards']),
                'description' => 'MAMAMOO is a four-member South Korean girl group known for their strong vocal performances and diverse music styles.'
            ],
            [
                'name' => 'MONSTA X',
                'company' => 'Starship Entertainment',
                'debut_year' => 2015,
                'thumbnail' => 'https://d.newsweek.com/en/full/1551001/k-pop-group-monsta-x-new-album-2019.jpg',
                'fandom_name' => 'MONBEBE',
                'members' => json_encode(['Shownu', 'Minhyuk', 'Kihyun', 'Hyungwon', 'Joohoney', 'I.M']),
                'discography' => json_encode(['The Clan Pt. 2.5', 'Take.1 Are You There?', 'All About Luv', 'Fatal Love', 'No Limit']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'MONSTA X is a six-member South Korean boy band formed by Starship Entertainment, known for their powerful performances and international presence.'
            ],
            [
                'name' => 'NCT 127',
                'company' => 'SM Entertainment',
                'debut_year' => 2016,
                'thumbnail' => 'https://www.allkpop.com/upload/2021/10/content/081125/web_data/allkpop_1633706780_untitled-1.jpg',
                'fandom_name' => 'NCTzen',
                'members' => json_encode(['Taeil', 'Johnny', 'Taeyong', 'Yuta', 'Doyoung', 'Jaehyun', 'Jungwoo', 'Mark', 'Haechan']),
                'discography' => json_encode(['NCT #127', 'Limitless', 'Regular-Irregular', 'Neo Zone', 'Sticker']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'NCT 127 is a nine-member sub-unit of NCT under SM Entertainment, known for their experimental music and dynamic performances.'
            ],
            [
                'name' => 'ITZY',
                'company' => 'JYP Entertainment',
                'debut_year' => 2019,
                'thumbnail' => 'https://dbkpop.com/wp-content/uploads/2019/07/itzy_itz_icy_teaser_2.jpg',
                'fandom_name' => 'MIDZY',
                'members' => json_encode(['Yeji', 'Lia', 'Ryujin', 'Chaeryeong', 'Yuna']),
                'discography' => json_encode(['It’z Different', 'It’z Me', 'Not Shy', 'Guess Who', 'Crazy in Love']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'ITZY is a five-member South Korean girl group formed by JYP Entertainment, known for their confident concepts and catchy music.'
            ],
            [
                'name' => 'STRAY KIDS',
                'company' => 'JYP Entertainment',
                'debut_year' => 2018,
                'thumbnail' => 'https://www.musicmundial.com/en/wp-content/uploads/2023/10/Stray-Kids-releases-the-first-set-of-concept-photos-for-their-new-album-Rock-Star-1.jpg',
                'fandom_name' => 'STAY',
                'members' => json_encode(['Bang Chan', 'Lee Know', 'Changbin', 'Hyunjin', 'Han', 'Felix', 'Seungmin', 'I.N']),
                'discography' => json_encode(['I Am NOT', 'Clé 1: Miroh', 'Go Live', 'NOEASY', 'MAXIDENT']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'STRAY KIDS is an eight-member South Korean boy band formed by JYP Entertainment, known for their self-produced music and energetic performances.'
            ],
            [
                'name' => 'TXT',
                'company' => 'HYBE (Big Hit Music)',
                'debut_year' => 2019,
                'thumbnail' => 'https://preview.redd.it/c2ewp9dotq091.jpg?width=3000&format=pjpg&auto=webp&s=8fa657ce40dd9b1a5aa2b771e8457d83184194b4',
                'fandom_name' => 'MOA',
                'members' => json_encode(['Soobin', 'Yeonjun', 'Beomgyu', 'Taehyun', 'Huening Kai']),
                'discography' => json_encode(['The Dream Chapter: STAR', 'The Dream Chapter: MAGIC', 'minisode1: Blue Hour', 'The Chaos Chapter: FREEZE', 'The Name Chapter: TEMPTATION']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'TXT is a five-member South Korean boy band formed by Big Hit Music, known for their storytelling and diverse music.'
            ],
            [
                'name' => 'ENHYPEN',
                'company' => 'BELIFT LAB (HYBE)',
                'debut_year' => 2020,
                'thumbnail' => 'https://www.allkpop.com/upload/2021/12/content/291134/web_data/allkpop_1640795807_untitled-1.jpg',
                'fandom_name' => 'ENGENE',
                'members' => json_encode(['Jungwon', 'Heeseung', 'Jay', 'Jake', 'Sunghoon', 'Sunoo', 'Ni-ki']),
                'discography' => json_encode(['BORDER: DAY ONE', 'BORDER: CARNIVAL', 'DIMENSION: DILEMMA', 'MANIFESTO: DAY 1']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'ENHYPEN is a seven-member South Korean boy band formed by BELIFT LAB, known for their powerful performances and global appeal.'
            ],
            [
                'name' => 'IVE',
                'company' => 'Starship Entertainment',
                'debut_year' => 2021,
                'thumbnail' => 'https://a-static.besthdwallpaper.com/ive-kpop-band-members-wave-album-shoot-wallpaper-3554x1999-117857_53.jpg',
                'fandom_name' => 'DIVE',
                'members' => json_encode(['Yujin', 'Gaeul', 'Rei', 'Wonyoung', 'Liz', 'Leeseo']),
                'discography' => json_encode(['ELEVEN', 'LOVE DIVE', 'After LIKE', 'I AM']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'IVE is a six-member South Korean girl group formed by Starship Entertainment, known for their catchy songs and confident image.'
            ],
            [
                'name' => 'LE SSERAFIM',
                'company' => 'Source Music (HYBE)',
                'debut_year' => 2022,
                'thumbnail' => 'https://kpop-france.com/wp-content/uploads/2025/03/le-sserafim-k-pop-3840x2160-16452-2048x1152.jpg',
                'fandom_name' => 'FEARNOT',
                'members' => json_encode(['Sakura', 'Kim Chaewon', 'Huh Yunjin', 'Kazuha', 'Hong Eunchae']),
                'discography' => json_encode(['FEARLESS', 'ANTIFRAGILE', 'UNFORGIVEN']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'LE SSERAFIM is a five-member South Korean girl group formed by Source Music, known for their bold concepts and strong performances.'
            ],
            [
                'name' => 'NEWJEANS',
                'company' => 'ADOR (HYBE)',
                'debut_year' => 2022,
                'thumbnail' => 'https://tse3.mm.bing.net/th/id/OIP.Y_Cmemb6hc0H1M0-De8fRgHaEt?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
                'fandom_name' => 'Bunnies',
                'members' => json_encode(['Minji', 'Hanni', 'Danielle', 'Haerin', 'Hyein']),
                'discography' => json_encode(['New Jeans', 'OMG', 'Get Up']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'NEWJEANS is a five-member South Korean girl group formed by ADOR, known for their fresh sound and trendsetting style.'
            ],
            [
                'name' => 'STAYC',
                'company' => 'High Up Entertainment',
                'debut_year' => 2020,
                'thumbnail' => 'https://tse2.mm.bing.net/th/id/OIP.N5cf5ZSkCEsB4h6_RHBMZgHaEH?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
                'fandom_name' => 'SWITH',
                'members' => json_encode(['Sumin', 'Sieun', 'Isa', 'Seeun', 'Yoon', 'J']),
                'discography' => json_encode(['Star To A Young Culture', 'STAYDOM', 'STEREOTYPE', 'YOUNG-LUV.COM']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'STAYC is a six-member South Korean girl group formed by High Up Entertainment, known for their unique vocal color and catchy music.'
            ],
            [
                'name' => 'TREASURE',
                'company' => 'YG Entertainment',
                'debut_year' => 2020,
                'thumbnail' => 'https://www.allkpop.com/upload/2022/02/content/071142/1644252143-untitled-1.jpg',
                'fandom_name' => 'Treasure Makers',
                'members' => json_encode(['Hyunsuk', 'Jihoon', 'Yoshi', 'Junkyu', 'Mashiho', 'Jaehyuk', 'Asahi', 'Yedam', 'Doyoung', 'Haruto', 'Jeongwoo', 'Junghwan']),
                'discography' => json_encode(['THE FIRST STEP: CHAPTER ONE', 'THE FIRST STEP: CHAPTER TWO', 'THE FIRST STEP: CHAPTER THREE', 'THE FIRST STEP: TREASURE EFFECT']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'TREASURE is a twelve-member South Korean boy band formed by YG Entertainment, known for their energetic performances and diverse music.'
            ],
            [
                'name' => 'SF9',
                'company' => 'FNC Entertainment',
                'debut_year' => 2016,
                'thumbnail' => 'https://0.soompi.io/wp-content/uploads/2017/06/07073028/sf9.jpg',
                'fandom_name' => 'Fantasy',
                'members' => json_encode(['Youngbin', 'Inseong', 'Jaeyoon', 'Dawon', 'Zuho', 'Rowoon', 'Taeyang', 'Hwiyoung', 'Chani']),
                'discography' => json_encode(['Feeling Sensation', 'Burning Sensation', 'Knights of the Sun', 'First Collection', 'Turn Over']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'SF9 is a nine-member South Korean boy band formed by FNC Entertainment, known for their sharp choreography and diverse music.'
            ],
            [
                'name' => 'ASTRO',
                'company' => 'Fantagio',
                'debut_year' => 2016,
                'thumbnail' => 'https://tse4.mm.bing.net/th/id/OIP.7JHT7CF47b72xYYBp2CviAHaK9?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
                'fandom_name' => 'AROHA',
                'members' => json_encode(['MJ', 'JinJin', 'Cha Eun-woo', 'Moonbin', 'Rocky', 'Yoon San-ha']),
                'discography' => json_encode(['Spring Up', 'Summer Vibes', 'Dream Part.01', 'All Light', 'Drive to the Starry Road']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'ASTRO is a six-member South Korean boy band formed by Fantagio, known for their bright concepts and strong vocals.'
            ],
            [
                'name' => 'THE BOYZ',
                'company' => 'IST Entertainment',
                'debut_year' => 2017,
                'thumbnail' => 'https://www.allkpop.com/upload/2023/07/content/291149/web_data/allkpop_1690646126_f2nnleqaqaa3-y2.jpg',
                'fandom_name' => 'THE B',
                'members' => json_encode(['Sangyeon', 'Jacob', 'Younghoon', 'Hyunjae', 'Juyeon', 'Kevin', 'New', 'Q', 'Juhaknyeon', 'Sunwoo', 'Eric']),
                'discography' => json_encode(['The First', 'The Only', 'Reveal', 'Chase', 'Thrill-ing']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'THE BOYZ is an eleven-member South Korean boy band formed by IST Entertainment, known for their synchronized performances and diverse music.'
            ],
            [
                'name' => 'ATEEZ',
                'company' => 'KQ Entertainment',
                'debut_year' => 2018,
                'thumbnail' => 'https://www.nme.com/wp-content/uploads/2022/07/ateez-kq-entertainment-120722.jpg',
                'fandom_name' => 'ATINY',
                'members' => json_encode(['Hongjoong', 'Seonghwa', 'Yunho', 'Yeosang', 'San', 'Mingi', 'Wooyoung', 'Jongho']),
                'discography' => json_encode(['TREASURE EP.1', 'TREASURE EP.FIN: All To Action', 'ZERO: FEVER Part.1', 'ZERO: FEVER Part.3', 'THE WORLD EP.1: MOVEMENT']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'ATEEZ is an eight-member South Korean boy band formed by KQ Entertainment, known for their powerful performances and global fanbase.'
            ],
            [
                'name' => 'GFRIEND',
                'company' => 'Source Music',
                'debut_year' => 2015,
                'thumbnail' => 'https://vignette.wikia.nocookie.net/kpop/images/1/1d/GFRIEND_Flower_group_promo_photo_(1).png/revision/latest?cb=20190305155518',
                'fandom_name' => 'BUDDY',
                'members' => json_encode(['Sowon', 'Yerin', 'Eunha', 'Yuju', 'SinB', 'Umji']),
                'discography' => json_encode(['Season of Glass', 'Snowflake', 'The Awakening', 'Time for the Moon Night', '回:Walpurgis Night']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'GFRIEND was a six-member South Korean girl group formed by Source Music, known for their powerful choreography and emotional music.'
            ],
            [
                'name' => 'LOONA',
                'company' => 'Blockberry Creative',
                'debut_year' => 2018,
                'thumbnail' => 'https://0.soompi.io/wp-content/uploads/2023/06/16055950/LOONA.jpeg',
                'fandom_name' => 'Orbit',
                'members' => json_encode(['HeeJin', 'HyunJin', 'HaSeul', 'YeoJin', 'ViVi', 'Kim Lip', 'JinSoul', 'Choerry', 'Yves', 'Chuu', 'Go Won', 'Olivia Hye']),
                'discography' => json_encode(['+ +', 'X X', '[#]', '12:00', 'AND']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'LOONA is a twelve-member South Korean girl group formed by Blockberry Creative, known for their unique concepts and dedicated fanbase.'
            ],
            [
                'name' => 'APINK',
                'company' => 'IST Entertainment',
                'debut_year' => 2011,
                'thumbnail' => 'https://wallpapercave.com/wp/wp6018829.png',
                'fandom_name' => 'PANDA',
                'members' => json_encode(['Chorong', 'Bomi', 'Eunji', 'Naeun', 'Namjoo', 'Hayoung']),
                'discography' => json_encode(['Seven Springs of Apink', 'Pink Blossom', 'Pink Memory', 'Pink Revolution', 'LOOK']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'APINK is a six-member South Korean girl group formed by IST Entertainment, known for their sweet concepts and longevity.'
            ],
            [
                'name' => 'SHINee',
                'company' => 'SM Entertainment',
                'debut_year' => 2008,
                'thumbnail' => 'https://dbkpop.com/wp-content/uploads/2020/08/SHINee_Members_Profile_Good_Evening.jpg',
                'fandom_name' => 'Shawol',
                'members' => json_encode(['Onew', 'Key', 'Minho', 'Taemin', 'Jonghyun']),
                'discography' => json_encode(['The SHINee World', 'Lucifer', 'Dream Girl', 'Odd', 'Don’t Call Me']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'SHINee is a five-member South Korean boy band formed by SM Entertainment, known for their contemporary R&B sound and innovative performances.'
            ],
            [
                'name' => 'SUPER JUNIOR',
                'company' => 'SM Entertainment',
                'debut_year' => 2005,
                'thumbnail' => 'https://img.imageimg.net/artist/superjunior/img/profile.jpg',
                'fandom_name' => 'ELF',
                'members' => json_encode(['Leeteuk', 'Heechul', 'Yesung', 'Shindong', 'Sungmin', 'Eunhyuk', 'Donghae', 'Siwon', 'Ryeowook', 'Kyuhyun']),
                'discography' => json_encode(['Sorry, Sorry', 'Bonamana', 'Mr. Simple', 'MAMACITA', 'Time_Slip']),
                'awards' => json_encode(['Golden Disc Awards', 'Seoul Music Awards', 'Asia Artist Awards']),
                'description' => 'SUPER JUNIOR is a ten-member South Korean boy band formed by SM Entertainment, known for their global popularity and variety show presence.'
            ],
        ]);
    }
}
