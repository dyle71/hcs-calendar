import { nextTick } from "vue";
import { createI18n } from "vue-i18n";
import type { I18n, I18nOptions } from "vue-i18n";
import defaultMessages from "@/locales/en.json";

export const SUPPORT_LOCALES = ["en", "de"];

export function setupI18n(options: I18nOptions = { locale: "en" }): I18n {
  const i18n = createI18n(options);
  i18n.global.fallbackLocale = "en";
  i18n.global.setLocaleMessage("en", defaultMessages);
  return i18n;
}

export function setI18nLanguage(i18n: I18n, locale: string) {
  if (typeof i18n.global.locale === "string") {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }
  document?.querySelector("html")?.setAttribute("lang", locale);
}

export async function loadLocaleMessages(i18n: I18n, locale: string) {
  if (SUPPORT_LOCALES.indexOf(locale) === -1) {
    console.warn(
      `Requested locale "${locale}" is not in the list of supported locales. Try to load anyway.`
    );
  }
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`
  );
  i18n.global.setLocaleMessage(locale, messages.default);
  return nextTick();
}
