import type { Metadata } from "next";
import { siteConfig, isValidLocale } from "@/config/site";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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
    ? `${siteConfig.displayName} — Full-stack Developer`
    : `${siteConfig.displayName} — Full-stack Developer`;
  const description = siteConfig.bio[locale];

  return {
    title: {
      template: `%s | ${siteConfig.displayName}`,
      default: title,
    },
    description,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical: `${siteConfig.siteUrl}/${locale}`,
      languages: {
        vi: `${siteConfig.siteUrl}/vi`,
        en: `${siteConfig.siteUrl}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      alternateLocale: locale === "vi" ? "en_US" : "vi_VN",
      title,
      description,
      siteName: siteConfig.displayName,
      url: `${siteConfig.siteUrl}/${locale}`,
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
      <Header locale={lang} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer locale={lang} />
    </>
  );
}
