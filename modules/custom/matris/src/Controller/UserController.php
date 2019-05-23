<?php

/**
 * Created by PhpStorm.
 * User: Farzad
 * Date: 5/16/2017 AD
 * Time: 2:47 PM
 */

namespace Drupal\matris\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\user\Entity\User;
use Morilog\Jalali\jDate;
use Symfony\Component\HttpFoundation\Request;

class UserController extends ControllerBase
{

    public function customConvertDate($date)
    {
        if (empty($date)) {
            return null;
        }
        $now = new \DateTime();
        $now = $now->getTimestamp();
        try {
            $sepDate = (explode('-', $date));
            $persianDate = \jDateTime::toGregorian((int)$sepDate[0], (int)$sepDate[1], (int)$sepDate[2]);
            $englishDate = jDate::forge($persianDate[0] . '-' . $persianDate[1] . '-' . $persianDate[2])->time();

            if ($englishDate > $now) {
                return $now;
            }
        } catch (\Exception $e) {
            return null;
        }
        return $englishDate;
    }

    private $degrees = [
        'زير ديپلم' => 82,
        'ديپلم' => 83,
        'فوق ديپلم' => 84,
        'ليسانس' => 85,
        'فوق ليسانس' => 86,
        'دكترا' => 87
    ];

    private $jobs = [
        'آزاد' => 115,
        'استاد دانشگاه' => 88,
        'بازارياب' => 89,
        'بازرگان' => 90,
        'برنامه نويس' => 91,
        'پزشك' => 92,
        'خبرنگار' => 93,
        'دانش آموز' => 94,
        'دانشجو' => 95,
        'دبير' => 96,
        'روزنامه نگار' => 97,
        'طراح' => 98,
        'كارگردان' => 99,
        'كارمند' => 100,
        'مترجم' => 101,
        'محقق' => 102,
        'مدير' => 103,
        'مديرعامل' => 104,
        'مهندس راه' => 105,
        'مهندس شهرسازي' => 106,
        'مهندس صنايع' => 107,
        'مهندس عمران' => 108,
        'مهندس كامپيوتر' => 109,
        'مهندس معماري' => 110,
        'مهندس مكانيك' => 111,
        'مهندس معدن' => 112,
        'وكيل' => 113,
        'هيئت علمي' => 114
    ];

    public function convertDB(Request $request) {
        var_dump('Ready to Lunch');
        die;

        $db = \Drupal::database();
        $data = $db->select('end_user', 't')->fields('t')->execute();
        foreach ($data as $d) {

//            if ($d->email == 'a.saei52@yahoo.com') {
//                var_dump($d->name);
//                var_dump(jDate::forge($d->last_login_count)->time());
//                var_dump(jDate::forge($d->last_login_count)->time() < 0);
//                die('+++payam hooroofchin+++');
//            }

            $user = User::create();
            $user->setUsername($d->username);
            $user->setPassword($d->cellphone);
            $user->setEmail($d->email);
            if (!empty($d->last_login_count) && !preg_match('/0000/', $d->last_login_count) && jDate::forge($d->last_login_count)->time() > 0) {
                $user->setLastLoginTime(jDate::forge($d->last_login_count)->time());
            }

            $user->set('field_first_name', $d->name);
            $user->set('field_last_name', $d->family);
            $user->set('field_matris_id', $d->id);
            $user->set('field_address', $d->address);
            $user->set('field_birthday', $this->customConvertDate($d->birth));
            $user->set('field_buy_cost', $d->buycost);
            $user->set('field_buy_day', $this->customConvertDate($d->buyday));
            $user->set('field_city', $d->city);
            $user->set('field_degree', $this->degrees[$d->degree]);
            $user->set('field_job', $this->jobs[$d->job]);
            $user->set('field_login_count', $d->login_count);
            $user->set('field_marriage', $d->marriage);
            $user->set('field_mobile', $d->cellphone);
            $user->set('field_online', false);
            $user->set('field_phone', $d->telephone);
            $user->set('field_store_name', $d->store_name);
            $user->activate();
            $user->save();

        }


    }

}
