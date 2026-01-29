/**
 * Site Configuration Constants
 * Central place for contact info, WhatsApp, etc.
 */

// WhatsApp number (without + or spaces)
export const WHATSAPP_NUMBER = "966565560831";

// Display phone number (formatted)
export const DISPLAY_PHONE = "056 556 0831";

// Location
export const LOCATION = "المملكة العربية السعودية";

// Site Name
export const SITE_NAME = "بطلة - أتيلييه ومحل خياطة";

// Site URL
export const SITE_URL = "https://boteq.com";

/**
 * Generate WhatsApp URL with pre-filled message
 * @param message - The message to pre-fill (will be URL encoded)
 */
export function getWhatsAppUrl(message: string = ""): string {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodedMessage}` : ""}`;
}

/**
 * Generate order message for a specific item
 * @param itemTitle - The title of the item being ordered
 * @param category - Optional category of the item
 * @param imageUrl - Optional image URL of the item
 */
export function getOrderWhatsAppUrl(itemTitle: string, category?: string, imageUrl?: string): string {
    let message = `السلام عليكم 👋\n\nأرغب في طلب التصميم التالي:\n\n📌 *${itemTitle}*`;

    if (category) {
        message += `\n📂 التصنيف: ${category}`;
    }

    if (imageUrl) {
        message += `\n🖼️ صورة التصميم: ${imageUrl}`;
    }

    message += `\n\nأرجو التواصل معي لمزيد من التفاصيل.\nشكراً لكم 🙏`;

    return getWhatsAppUrl(message);
}

/**
 * Generate general inquiry message
 */
export function getInquiryWhatsAppUrl(): string {
    const message = `السلام عليكم 👋

أود الاستفسار عن خدماتكم.

شكراً لكم 🙏`;

    return getWhatsAppUrl(message);
}
/**
 * Generate inquiry message for a specific service
 * @param serviceName - The name of the service
 * @param pageUrl - The URL of the service page
 */
export function getServiceInquiryWhatsAppUrl(serviceName: string, pageUrl: string): string {
    const intro = `مرحباً بكِ في متجر رواء

نسعد بخدمتكِ دائماً
نوفر خدمة التوصيل لباب البيت 🚚

اتركي الطلب أو الإستفسار
وسيتم الرد بأقرب وقت ممكن ✨

- عند الطلب يرجى كتابة :
الإسم + المنطقة + رقم الجوال
- ولتحديد المقاس المناسب :
ارسلي مقاسك لتحديد المقاس المناسب بكل دقة .`;

    const message = `${intro}

أود الاستفسار عن خدمة: *${serviceName}*

رابط الخدمة:
${pageUrl}

شكراً لكم 🙏`;

    return getWhatsAppUrl(message);
}
