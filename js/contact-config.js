/** Single source of truth — all links read from here */
window.NGD_CONTACT = {
  email: "pothugantivarsha101@gmail.com",
  phoneE164: "918790084139",
  phoneDisplay: "+91 87900 84139",
  whatsappMessage:
    "Hi Varsha, I saw your portfolio and would like to discuss a project.",
};

window.NGD_CONTACT.whatsappUrl = `https://wa.me/${
  window.NGD_CONTACT.phoneE164
}?text=${encodeURIComponent(window.NGD_CONTACT.whatsappMessage)}`;

window.NGD_CONTACT.telUrl = `tel:+${window.NGD_CONTACT.phoneE164}`;

window.NGD_CONTACT.mailtoUrl = `mailto:${window.NGD_CONTACT.email}`;
