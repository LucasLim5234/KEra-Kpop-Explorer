<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\Idol;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        $idols = Idol::all();
        foreach ($idols as $idol) {
            $questions = $this->generateQuestions($idol);
            foreach ($questions as $q) {
                Quiz::create([
                    'idol_id' => $idol->id,
                    'question' => $q['question'],
                    'option_a' => $q['option_a'],
                    'option_b' => $q['option_b'],
                    'option_c' => $q['option_c'],
                    'option_d' => $q['option_d'],
                    'answer' => $q['answer'],
                ]);
            }
        }
    }

    private function generateQuestions($idol)
    {
        $members = is_array($idol->members) ? $idol->members : json_decode($idol->members, true);
        $discography = is_array($idol->discography) ? $idol->discography : json_decode($idol->discography, true);
        $awards = is_array($idol->awards) ? $idol->awards : json_decode($idol->awards, true);
        $questions = [];

        $questions[] = [
            'question' => "Which year did {$idol->name} debut?",
            'option_a' => $idol->debut_year - 1,
            'option_b' => $idol->debut_year,
            'option_c' => $idol->debut_year + 1,
            'option_d' => $idol->debut_year + 2,
            'answer' => 'B'
        ];

        $otherFandoms = array_filter(['ARMY','BLINK','ONCE','EXO-L','ReVeluv','CARAT','IGOT7','MooMoo','MONBEBE','NCTzen','MIDZY','STAY','MOA','ENGENE','DIVE','FEARNOT','Bunnies','SWITH','Treasure Makers','Fantasy','AROHA','THE B','ATINY','BUDDY','Orbit','PANDA','Shawol','ELF'], function($f) use ($idol) { return $f !== $idol->fandom_name; });
        shuffle($otherFandoms);
        $questions[] = [
            'question' => "What is the fandom name of {$idol->name}?",
            'option_a' => $idol->fandom_name,
            'option_b' => $otherFandoms[0],
            'option_c' => $otherFandoms[1],
            'option_d' => $otherFandoms[2],
            'answer' => 'A'
        ];

        $otherMembers = array_filter(['Jungkook','Jisoo','Nayeon','Kai','Irene','S.Coups','JB','Solar','Shownu','Taeil','Yeji','Bang Chan','Soobin','Jungwon','Yujin','Sakura','Minji','Sumin','Hyunsuk','Youngbin','MJ','Sangyeon','Hongjoong','Sowon','HeeJin','Chorong','Onew','Leeteuk'], function($m) use ($members) { return !in_array($m, $members); });
        shuffle($otherMembers);
        $questions[] = [
            'question' => "Which member is NOT part of {$idol->name}?",
            'option_a' => $members[0],
            'option_b' => $members[1],
            'option_c' => $members[2],
            'option_d' => $otherMembers[0],
            'answer' => 'D'
        ];

        $otherAlbums = array_filter(['Wings','The Album','Twicetagram','XOXO','Perfect Velvet','Love&Letter','Flight Log: Turbulence','Melting','Fatal Love','Limitless','It’z Me','Clé 1: Miroh','The Dream Chapter: STAR','BORDER: DAY ONE','ELEVEN','FEARLESS','New Jeans','Star To A Young Culture','THE FIRST STEP: CHAPTER ONE','Feeling Sensation','Spring Up','The First','TREASURE EP.1','Season of Glass','+ +','Seven Springs of Apink','The SHINee World','Sorry, Sorry'], function($a) use ($discography) { return !in_array($a, $discography); });
        shuffle($otherAlbums);
        $questions[] = [
            'question' => "Which album is by {$idol->name}?",
            'option_a' => $discography[0],
            'option_b' => $otherAlbums[0],
            'option_c' => $otherAlbums[1],
            'option_d' => $otherAlbums[2],
            'answer' => 'A'
        ];

        $otherAwards = array_filter(['Grammy Award','MTV Video Music Awards','Asia Artist Awards','Melon Music Awards','Billboard Music Awards','American Music Awards','Seoul Music Awards','Golden Disc Awards','Mnet Asian Music Awards'], function($a) use ($awards) { return !in_array($a, $awards); });
        shuffle($otherAwards);
        $questions[] = [
            'question' => "Which award has {$idol->name} NOT won?",
            'option_a' => $awards[0],
            'option_b' => $awards[1],
            'option_c' => $otherAwards[0],
            'option_d' => $awards[2],
            'answer' => 'C'
        ];

        $companies = array_filter(['HYBE (Big Hit Music)','YG Entertainment','JYP Entertainment','SM Entertainment','Pledis Entertainment','RBW','Starship Entertainment','FNC Entertainment','Fantagio','IST Entertainment','KQ Entertainment','Source Music','Blockberry Creative','High Up Entertainment','BELIFT LAB (HYBE)','ADOR (HYBE)'], function($c) use ($idol) { return $c !== $idol->company; });
        shuffle($companies);
        $questions[] = [
            'question' => "Which company manages {$idol->name}?",
            'option_a' => $idol->company,
            'option_b' => $companies[0],
            'option_c' => $companies[1],
            'option_d' => $companies[2],
            'answer' => 'A'
        ];

        $otherDescs = ['A group known for their rock music.','A solo artist with jazz influences.','A duo famous for ballads.'];
        $questions[] = [
            'question' => "Which statement best describes {$idol->name}?",
            'option_a' => $idol->description,
            'option_b' => $otherDescs[0],
            'option_c' => $otherDescs[1],
            'option_d' => $otherDescs[2],
            'answer' => 'A'
        ];

        $albumYear = $idol->debut_year + 1;
        $questions[] = [
            'question' => "Which year was {$discography[0]} released by {$idol->name}?",
            'option_a' => $albumYear,
            'option_b' => $albumYear + 1,
            'option_c' => $albumYear - 1,
            'option_d' => $albumYear + 2,
            'answer' => 'A'
        ];

        shuffle($otherMembers);
        $questions[] = [
            'question' => "Who is a member of {$idol->name}?",
            'option_a' => $members[0],
            'option_b' => $otherMembers[0],
            'option_c' => $otherMembers[1],
            'option_d' => $otherMembers[2],
            'answer' => 'A'
        ];

        shuffle($otherFandoms);
        $questions[] = [
            'question' => "Which is the official fandom name of {$idol->name}?",
            'option_a' => $idol->fandom_name,
            'option_b' => $otherFandoms[3],
            'option_c' => $otherFandoms[4],
            'option_d' => $otherFandoms[5],
            'answer' => 'A'
        ];

        return $questions;
    }
}
