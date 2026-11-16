import type { Metadata } from "next";
import { siteConfig, isValidLocale } from "@/config/site";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const instant = false;

export async function generateStaticParams() {
  return siteConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : siteConfig.defaultLocale;

  const isVi = locale === "vi";
  const title = isVi
    ? `${siteConfig.displayName} — Lập trình viên Full-stack`
    : `${siteConfig.displayName} — Full-stack Developer`;
  const description = siteConfig.bio[locale];
  const siteUrl = siteConfig.siteUrl;

  return {
    title: {
      template: `%s | ${siteConfig.displayName}`,
      default: title,
    },
    description,
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    alternates: {
      ...(siteUrl
        ? {
            canonical: `${siteUrl}/${locale}`,
            languages: {
              vi: `${siteUrl}/vi`,
              en: `${siteUrl}/en`,
            },
          }
        : {}),
    },
    openGraph: {
      type: "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      alternateLocale: locale === "vi" ? "en_US" : "vi_VN",
      title,
      description,
      siteName: siteConfig.displayName,
      ...(siteUrl ? { url: `${siteUrl}/${locale}` } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!isValidLocale(lang)) notFound();

  return (
    <>
      <a href="#main-content" lang={lang} className="skip-link">
        {lang === "vi" ? "Bỏ qua đến nội dung chính" : "Skip to main content"}
      </a>
      <div lang={lang}>
        <Header locale={lang} />
      </div>
      <main id="main-content" lang={lang} className="flex-1">
        {children}
      </main>
      <div lang={lang}>
        <Footer locale={lang} />
      </div>
    </>
  );
}
