import { company } from "@/data/company";

export function getTelHref(phone = company.phoneHref) {
  return `tel:${phone}`;
}

export function getWhatsAppHref(message: string, phone = company.whatsappNumber) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getProductInquiryMessage(productName: string) {
  return `Hello Reman, I would like more information about ${productName}.`;
}
