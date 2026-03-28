const holiday_dates =  {
    "International New Year Day":{
        title:"រីករាយពិធីបុណ្យចូលឆ្នាំសកល",
        description:"សូមអបអរសាទរទិវាបុណ្យចូលឆ្នាំសកល! សូមជូនពរឱ្យមាននូវសេចក្តីសុខ និងជោគជ័យសម្រាប់អ្នកគ្រប់គ្នា។",
        photo:new URL('@/assets/images/public-holiday/NewYear.jpg', import.meta.url).href
    },
    "Day of Victory over the Genocidal Regime":{
        title:"ជ័យជម្នះ ៧ មករា",
        description:"អបអរសាទរខួបអនុស្សាវរីយ៍នៃទិវាជ័យជម្នះ ៧ មករា! សូមចងចាំនូវស្មារតីសន្តិភាព និងរួមគ្នាអភិវឌ្ឍមាតុភូមិឱ្យកាន់តែរីកចម្រើន",
        photo:new URL('@/assets/images/public-holiday/jan-07.jpg', import.meta.url).href
    },
     "International Women's Rights Day":{
        title:"អបអរសាទរទិវាសិទ្ធិនារី",
        description:"អបអរសាទរទិវាសិទ្ធិនារីអន្តរជាតិ ៨ មីនា! លើកកម្ពស់សមភាពយេនឌ័រ និងផ្តល់តម្លៃដល់ស្រ្តីដើម្បីកសាងសង្គមឱ្យកាន់តែប្រសើរឡើង",
        photo:new URL('@/assets/images/public-holiday/mar-08.jpg', import.meta.url).href
    },
    "Khmer New Year's Day":{
        title:"រីករាយពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិខ្មែរ",
        description:"រីករាយពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិខ្មែរ! សូមជូនពរឱ្យមានសុខភាពល្អ សំណាងល្អ និងទទួលបានជោគជ័យគ្រប់ភារកិច្ច",
        photo:new URL('@/assets/images/public-holiday/khmerNewYear.jpg', import.meta.url).href
    },
    "International Labor Day":{
        title:"អបអរសាទរទិវាពលកម្មអន្តរជាតិ",
        description:"អបអរសាទរទិវាពលកម្មអន្តរជាតិ ១ ឧសភា! សូមគោរពកោតសរសើរដល់ការខិតខំប្រឹងប្រែងរបស់បងប្អូនកម្មករ និយោជិត ដើម្បីការអភិវឌ្ឍសង្គមជាតិ",
        photo:new URL('@/assets/images/public-holiday/may-01.jpg', import.meta.url).href
    },
     "Visaka Bochea Day":{
        title:"អបអរសាទរពិធីបុណ្យវិសាខបូជា",
        description:"អបអរសាទរពិធីបុណ្យវិសាខបូជា! ជាទិវាដ៏សក្ការៈរំលឹកដល់ព្រះប្រសូត ត្រាស់ដឹង និងបរិនិព្វានរបស់ព្រះសម្មាសម្ពុទ្ធ ព្រមទាំងលើកកម្ពស់សន្តិភាពតាមរយៈធម៌វិន័យ",
        photo:new URL('@/assets/images/public-holiday/VisakaBocheaDay.jpg', import.meta.url).href
    },
    "Birthday of His Majesty Preah Bat Samdech Preah Boromneath NORODOM SIHAMONI, King of Cambodia":{
        title:"អបអរសាទរខួបចម្រើនព្រះជន្ម ព្រះករុណា ព្រះបាទសម្តេចព្រះបរមនាថ នរោត្តម សីហមុនី",
        description:"អបអរសាទរខួបចម្រើនព្រះជន្ម ព្រះករុណា ព្រះបាទសម្តេចព្រះបរមនាថ នរោត្តម សីហមុនី! សូមថ្វាយព្រះពរព្រះអង្គមានព្រះជន្មាយុយឺនយូរ និងជាម្លប់ដ៏ត្រជាក់ដល់ប្រជារាស្ត្រខ្មែរ",
        photo:new URL('@/assets/images/public-holiday/BirthdayKing.jpg', import.meta.url).href
    },
    "Royal Ploughing Ceremony":{
        title:"ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល",
        description:"អបអរសាទរព្រះរាជពិធីច្រត់ព្រះនង្គ័ល! សូមបួងសួងដល់អស់ទេវតាជួយឱ្យភោគផលកសិកម្មទទួលបានទិន្នផលខ្ពស់ និងសម្បូរសប្បាយគ្រប់ទីកន្លែង",
        photo:new URL('@/assets/images/public-holiday/RoyalPloughingCeremony.jpg', import.meta.url).href
    },
     "Birthday of Her Majesty the Queen-Mother NORODOM MONINEATH SIHANOUK of Cambodia":{
        title:"អបអរសាទរខួបចម្រើនព្រះជន្ម ព្រះវររាជមាតាជាតិខ្មែរ នរោត្តម មុនិនាថ សីហនុ",
        description:"អបអរសាទរខួបចម្រើនព្រះជន្ម ព្រះវររាជមាតាជាតិខ្មែរ នរោត្តម មុនិនាថ សីហនុ! សូមថ្វាយព្រះពរព្រះអង្គមានព្រះសុខភាពល្អបរិបូរណ៍ និងព្រះជន្មាយុយឺនយូរជាងរយព្រះវស្សា",
        photo:new URL('@/assets/images/public-holiday/BirthdayQueen.jpg', import.meta.url).href
    },
    "Constitution Day":{
        title:"អបអរសាទរទិវាប្រកាសរដ្ឋធម្មនុញ្ញ",
        description:"អបអរសាទរទិវាប្រកាសរដ្ឋធម្មនុញ្ញ! រួមគ្នាគោរព ការពារ និងលើកកម្ពស់ច្បាប់កំពូលរបស់ជាតិ ដើម្បីសន្តិភាព និងលទ្ធិប្រជាធិបតេយ្យ",
        photo:new URL('@/assets/images/public-holiday/ConstitutionDay.jpg', import.meta.url).href
    },
    "Pchum Ben Day":{
        title:"រីករាយពិធីបុណ្យភ្ជុំបិណ្ឌ",
        description:"រីករាយពិធីបុណ្យភ្ជុំបិណ្ឌ! សូមឧទ្ទិសមហាកុសលជូនដល់បុព្វការីជន និងញាតិការទាំងប្រាំពីរអសន្តានដែលបានចែកឋានទៅ ហើយសូមទទួលបានសេចក្តីសុខសប្បាយគ្រប់ក្រុមគ្រួសារ",
        photo:new URL('@/assets/images/public-holiday/PchumBen.jpg', import.meta.url).href
    },
     "Mourning Day of the Late King-Father NORODOM SIHANOUK of Cambodia":{
        title:"រំលឹកខួប និងសម្តែងនូវកតញ្ញូតាធម៌ដ៏ខ្ពង់ខ្ពស់បំផុតចំពោះ ព្រះបរមរតនកោដ្ឋ នរោត្តម សីហនុ",
        description:"សូមគោរពរំលឹកខួប និងសម្តែងនូវកតញ្ញូតាធម៌ដ៏ខ្ពង់ខ្ពស់បំផុតចំពោះ ព្រះបរមរតនកោដ្ឋ នរោត្តម សីហនុ! សូមចងចាំជានិច្ចនូវព្រះរាជបូជនីយកិច្ចដើម្បីឯករាជ្យជាតិ និងសន្តិភាព",
        photo:new URL('@/assets/images/public-holiday/KingFather.jpg', import.meta.url).href
    },
    "Coronation Day of His Majesty Preah Bat Samdech Preah Boromneath NORODOM SIHAMONI, King of Cambodia":{
        title:"ព្រះរាជពិធីគ្រងព្រះបរមរាជសម្បត្តិរបស់ ព្រះករុណា ព្រះបាទសម្តេចព្រះបរមនាថ នរោត្តម សីហមុនី",
        description:"អបអរសាទរ នៃព្រះរាជពិធីគ្រងព្រះបរមរាជសម្បត្តិរបស់ ព្រះករុណា ព្រះបាទសម្តេចព្រះបរមនាថ នរោត្តម សីហមុនី! សូមថ្វាយព្រះពរព្រះអង្គគ្រងរាជ្យសម្បត្តិជាម្លប់សន្តិភាពយូរអង្វែង",
        photo:new URL('@/assets/images/public-holiday/CoronationDay.jpg', import.meta.url).href
    },
     "National Independence Day":{
        title:"ទិវាបុណ្យឯករាជ្យជាតិ ៩ វិច្ឆិកា",
        description:"អបអរសាទរខួបអនុស្សាវរីយ៍ នៃទិវាបុណ្យឯករាជ្យជាតិ ៩ វិច្ឆិកា! សូមសម្តែងនូវកតញ្ញូតាធម៌ចំពោះវីរជនដែលបានលះបង់ដើម្បីសេរីភាព និងអធិបតេយ្យភាពជាតិ",
        photo:new URL('@/assets/images/public-holiday/IndependenceDay.jpg', import.meta.url).href
    },
    "Water Festival":{
        title:"រីករាយពិធីបុណ្យអុំទូក",
        description:"អបអរសាទរពិធីបុណ្យអុំទូក អកអំបុក បណ្តែតប្រទីប និងសំពះព្រះខែ! សូមរីករាយជាមួយទស្សនីយភាពការប្រណាំងទូកង និងទទួលបាននូវក្តីសុខគ្រប់ក្រុមគ្រួសារ",
        photo:new URL('@/assets/images/public-holiday/WaterFestival.jpg', import.meta.url).href
    },
     "Peace Day in Cambodia":{
        title:"រទិវាសន្តិភាពនៅកម្ពុជា ២៩ ធ្នូ",
        description:"អបអរសាទរទិវាសន្តិភាពនៅកម្ពុជា ២៩ ធ្នូ! រួមគ្នាថែរក្សាសន្តិភាពឱ្យបានគង់វង្ស ដើម្បីបន្តអភិវឌ្ឍមាតុភូមិយើងឱ្យកាន់តែរុងរឿងជានិច្ចនិរន្តរ៍",
        photo:new URL('@/assets/images/public-holiday/PeaceDayCambodia.jpg', import.meta.url).href
    },


}

export default holiday_dates;
