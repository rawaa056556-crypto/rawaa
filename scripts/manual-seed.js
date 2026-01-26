
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://eslamabdaltif:oneone2@cluster0.0pik04s.mongodb.net/?appName=Cluster0';

// Define Schema inline to avoid TS compilation issues
const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    iconName: { type: String, required: true, default: 'Sparkles' },
    features: { type: [String], default: [] },
    image: { type: String, required: true },
    gallery: { type: [String], default: [] },
    duration: { type: String, required: false },
    pricing: { type: String, required: false },
    order: { type: Number, default: 0 },
}, { timestamps: true });

// Use existing model if possible, or define new
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

const servicesToUpdate = [
    {
        key: 'prayer',
        filterTitle: 'إحرامات صلاه',
        updateData: {
            fullDescription: "تشكيلة واسعة من شراشف الصلاة المصممة لتمنحك الراحة والخشوع. نستخدم أجود أنواع الأقطان والأقمشة الباردة التي تسمح بمرور الهواء، مع تصاميم ساترة وفضفاضة تناسب جميع المقاسات. اهتمامنا بالتفاصيل يظهر في دقة الخياطة وتناسق الألوان، لنقدم لك منتجاً يجمع بين العملي والجمال.",
            features: ["أقمشة قطنية باردة ومريحة", "تصاميم ساترة وفضفاضة", "سهولة في الارتداء (موديلات لف وسحاب)", "ثبات في الألوان حتى مع الغسيل المتكرر"],
            duration: "فوري (للمتوفر) أو 3-5 أيام للتفصيل",
            pricing: "تبدأ من 80 ريال"
        }
    },
    {
        key: 'jalabiya',
        filterTitle: 'خياطة جلابيات',
        updateData: {
            fullDescription: "تألقي بأجمل تصاميم الجلابيات التي تجمع بين الأصالة والعصرية. سواء كنتِ تبحثين عن جلابية فاخرة للمناسبات أو جلابية يومية مريحة، نحن نحول فكرتك إلى واقع. نتقن التعامل مع جميع أنواع الأقمشة والتطريزات لنضمن لك قطعة فنية تليق بك.",
            features: ["تصاميم حصرية ومبتكرة", "دقة في المقاسات والقصات", "إمكانية تنفيذ أي موديل حسب الطلب", "تشطيبات نهائية عالية الجودة"],
            duration: "7-10 أيام",
            pricing: "حسب التصميم (يبدأ من 150 ريال)"
        }
    },
    {
        key: 'uniform',
        filterTitle: 'زي موحد', // "زي موحد (مراييل)" might be fuzzy, so matching partial
        updateData: {
            fullDescription: "نقدم خدمات تفصيل الأزياء الموحدة للمدارس والعمل بجودة عالية ومتانة تتحمل الاستخدام اليومي. نختار أقمشة عملية ومقاومة للتجعد، مع مراعاة الراحة وحرية الحركة. نضمن توحيد المظهر العام بدقة واحترافية.",
            features: ["أقمشة عملية تتحمل الاستهلاك", "خياطة متينة ومزدوجة", "قصات مريحة للحركة اليومية", "توفر جميع المقاسات"],
            duration: "5-7 أيام",
            pricing: "يبدأ من 120 ريال"
        }
    },
    {
        key: 'alterations',
        filterTitle: 'تعديل ملابس',
        updateData: {
            fullDescription: "لا داعي للاستغناء عن ملابسك المفضلة! نقدم خدمة التعديلات الاحترافية لضبط المقاسات، تقصير أو تضييق الملابس، وإصلاح العيوب. نهتم بأن يبدو التعديل وكأنه جزء من التصميم الأصلي للقطعة.",
            features: ["تضييق وتقصير باحترافية", "تغيير السحابات والأزرار", "إصلاح التمزقات بطرق فنية", "ضبط مقاسات فساتين السهرة"],
            duration: "2-3 أيام",
            pricing: "حسب نوع التعديل (يبدأ من 20 ريال)"
        }
    },
    {
        key: 'women',
        filterTitle: 'خياطة نسائية شاملة',
        updateData: {
            fullDescription: "أي تصميم يخطر ببالك، نحن هنا لتنفيذه. من الفساتين الناعمة إلى التنانير والبلوزات، نقدم لك خياطة متقنة لأي قطعة ملابس ترغبين بها. فريقنا المتخصص يساعدك في اختيار القصة المناسبة لقوامك والقماش الأنسب لموديلك.",
            features: ["استشارات لتصميم الموديل المناسب", "بروفات لضبط المقاس بدقة", "تنفيذ فساتين وتنانير وقمصان", "بطانات وتشطيبات (هوت كوتور)"],
            duration: "حسب القطعة (7-14 يوم)",
            pricing: "يبدأ من 100 ريال"
        }
    },
    {
        key: 'ihram',
        filterTitle: 'إحرامات حج وعمرة',
        updateData: {
            fullDescription: "تميزي في رحلتك الروحانية بملابس إحرام مريحة وعملية وساترة. نصمم عبايات ومستلزمات الحج والعمرة بأقمشة خفيفة لا تحتاج للكوي، مع جيوب وسحابات مخفية لتسهيل حركتك وحفظ مقتنياتك بأمان.",
            features: ["أقمشة خفيفة وباردة لا تشف", "جيوب سرية وسحابات عملية", "موديلات مريحة للمشي الطويل", "أطقم متكاملة"],
            duration: "3-5 أيام",
            pricing: "تبدأ من 150 ريال"
        }
    }
];

async function run() {
    console.log('Connecting to DB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    const services = await Service.find({});
    console.log('Found services:', services.length);
    services.forEach(s => console.log(` - Title: "${s.title}", Slug: "${s.slug}"`));

    for (const item of servicesToUpdate) {
        console.log(`Processing: "${item.filterTitle}"`);
        // Find service that contains the title part
        const service = await Service.findOne({ title: { $regex: item.filterTitle, $options: 'i' } });

        if (service) {
            console.log(`  -> Found service to update: ${service.title}`);
            service.fullDescription = item.updateData.fullDescription;
            service.features = item.updateData.features;
            service.duration = item.updateData.duration;
            service.pricing = item.updateData.pricing;
            await service.save();
            console.log('  -> Updated successfully.');
        } else {
            console.log('  -> Not found.');
        }
    }

    console.log('Done.');
    process.exit(0);
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
