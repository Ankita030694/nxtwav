import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  trackEvent?: { name: string; params?: Record<string, any> };
}

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogType = 'website',
  canonicalUrl,
  noindex = false,
  trackEvent
}: SEOProps) => {
  const location = useLocation();
  const baseUrl = 'https://www.nxtwavacademy.in';
  const currentUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Update Meta Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      } else {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        metaKeywords.setAttribute('content', keywords);
        document.head.appendChild(metaKeywords);
      }
    }

    // Update OG Title
    let metaOgTitle = document.querySelector('meta[property="og:title"]');
    if (metaOgTitle) {
      metaOgTitle.setAttribute('content', ogTitle || title);
    } else {
      metaOgTitle = document.createElement('meta');
      metaOgTitle.setAttribute('property', 'og:title');
      metaOgTitle.setAttribute('content', ogTitle || title);
      document.head.appendChild(metaOgTitle);
    }

    // Update OG Description
    let metaOgDescription = document.querySelector('meta[property="og:description"]');
    if (metaOgDescription) {
      metaOgDescription.setAttribute('content', ogDescription || description);
    } else {
      metaOgDescription = document.createElement('meta');
      metaOgDescription.setAttribute('property', 'og:description');
      metaOgDescription.setAttribute('content', ogDescription || description);
      document.head.appendChild(metaOgDescription);
    }

    // Update OG Type
    let metaOgType = document.querySelector('meta[property="og:type"]');
    if (metaOgType) {
      metaOgType.setAttribute('content', ogType);
    }

    // Update OG URL
    let metaOgUrl = document.querySelector('meta[property="og:url"]');
    if (metaOgUrl) {
      metaOgUrl.setAttribute('content', currentUrl);
    }

    // Update Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', canonicalUrl || currentUrl);
    } else {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      linkCanonical.setAttribute('href', canonicalUrl || currentUrl);
      document.head.appendChild(linkCanonical);
    }

    // Update Robots Meta
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (metaRobots) {
        metaRobots.setAttribute('content', 'noindex, nofollow');
      } else {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        metaRobots.setAttribute('content', 'noindex, nofollow');
        document.head.appendChild(metaRobots);
      }
    } else {
      if (metaRobots) {
        metaRobots.setAttribute('content', 'index, follow');
      }
    }

    // Track Page View
    if (window.gtag) {
      window.gtag('config', 'G-6DQ2MYDNVF', {
        page_path: location.pathname + location.search + location.hash,
        page_title: title,
      });

      // Track Custom Event if provided
      if (trackEvent) {
        window.gtag('event', trackEvent.name, trackEvent.params);
      }
    }

  }, [title, description, keywords, ogTitle, ogDescription, ogType, canonicalUrl, currentUrl, noindex, location.pathname, location.search, location.hash, trackEvent]);

  return null;
};

export default SEO;
