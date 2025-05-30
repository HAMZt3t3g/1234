import React, { createContext, useContext, useState } from 'react';

type Language = 'it' | 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  "it": {
    "welcome_msg": "Benvenuto su MaghrebItalia",
    "nav_home": "Home",
    "nav_news": "Notizie",
    "nav_events": "Eventi",
    "nav_profile": "Profilo",
    "nav_dashboard": "Dashboard",
    "register": "Registrati",
    "login": "Accedi",
    "logout": "Logout",
    "name_label": "Nome",
    "email_label": "Email",
    "password_label": "Password",
    "save": "Salva",
    "latest_news": "Ultime Notizie",
    "latest_events": "Prossimi Eventi",
    "subscribe_newsletter": "Iscriviti alla Newsletter",
    "subscribe": "Iscriviti",
    "hero_subtitle": "La comunità che unisce il Maghreb e l'Italia attraverso cultura, opportunità e connessioni",
    "discover_more": "Scopri di più",
    "add_news": "Aggiungi",
    "add_event": "Aggiungi Evento",
    "search_news": "Cerca notizie...",
    "search_events": "Cerca eventi...",
    "read_more": "Leggi di più",
    "show_less": "Mostra meno",
    "view_all_news": "Vedi tutte le notizie",
    "view_all_events": "Vedi tutti gli eventi",
    "news_date": "Data",
    "news_author": "Autore",
    "event_date": "Data",
    "event_time": "Ora",
    "event_location": "Luogo",
    "event_organizer": "Organizzatore",
    "back_to_home": "Torna alla homepage",
    "news_title": "Notizie ed Aggiornamenti",
    "news_description": "Resta aggiornato sulle ultime notizie, eventi e storie della comunità MaghrebItalia",
    "event_title": "Eventi e Incontri",
    "event_description": "Scopri tutti gli eventi organizzati dalla comunità MaghrebItalia e partecipa!",
    "no_results_found": "Nessun risultato trovato"
  },
  "ar": {
    "welcome_msg": "مرحبا بكم في MaghrebItalia",
    "nav_home": "الرئيسية",
    "nav_news": "الأخبار",
    "nav_events": "الفعاليات",
    "nav_profile": "ملفي الشخصي",
    "nav_dashboard": "لوحة التحكم",
    "register": "تسجيل",
    "login": "تسجيل الدخول",
    "logout": "تسجيل الخروج",
    "name_label": "الاسم",
    "email_label": "البريد الإلكتروني",
    "password_label": "كلمة المرور",
    "save": "حفظ",
    "latest_news": "آخر الأخبار",
    "latest_events": "الفعاليات القادمة",
    "subscribe_newsletter": "اشترك في النشرة الإخبارية",
    "subscribe": "اشترك",
    "hero_subtitle": "مجتمع يجمع بين المغرب وإيطاليا من خلال الثقافة والفرص والروابط",
    "discover_more": "اكتشف المزيد",
    "add_news": "إضافة",
    "add_event": "إضافة فعالية",
    "search_news": "البحث في الأخبار...",
    "search_events": "البحث عن فعاليات...",
    "read_more": "اقرأ المزيد",
    "show_less": "عرض أقل",
    "view_all_news": "عرض كل الأخبار",
    "view_all_events": "عرض جميع الفعاليات",
    "news_date": "التاريخ",
    "news_author": "الكاتب",
    "event_date": "التاريخ",
    "event_time": "الوقت",
    "event_location": "المكان",
    "event_organizer": "المنظم",
    "back_to_home": "العودة إلى الصفحة الرئيسية",
    "news_title": "الأخبار والتحديثات",
    "news_description": "ابق على اطلاع بآخر الأخبار والأحداث وقصص مجتمع MaghrebItalia",
    "event_title": "الفعاليات واللقاءات",
    "event_description": "اكتشف جميع الفعاليات التي ينظمها مجتمع MaghrebItalia وشارك فيها!",
    "no_results_found": "لم يتم العثور على نتائج"
  },
  "fr": {
    "welcome_msg": "Bienvenue sur MaghrebItalia",
    "nav_home": "Accueil",
    "nav_news": "Actualités",
    "nav_events": "Événements",
    "nav_profile": "Profil",
    "nav_dashboard": "Tableau de bord",
    "register": "S'inscrire",
    "login": "Connexion",
    "logout": "Déconnexion",
    "name_label": "Nom",
    "email_label": "Email",
    "password_label": "Mot de passe",
    "save": "Enregistrer",
    "latest_news": "Dernières actualités",
    "latest_events": "Prochains événements",
    "subscribe_newsletter": "Abonnez-vous à notre newsletter",
    "subscribe": "S'abonner",
    "hero_subtitle": "La communauté qui unit le Maghreb et l'Italie à travers la culture, les opportunités et les connexions",
    "discover_more": "En savoir plus",
    "add_news": "Ajouter",
    "add_event": "Ajouter un événement",
    "search_news": "Rechercher des actualités...",
    "search_events": "Rechercher des événements...",
    "read_more": "Lire la suite",
    "show_less": "Voir moins",
    "view_all_news": "Voir toutes les actualités",
    "view_all_events": "Voir tous les événements",
    "news_date": "Date",
    "news_author": "Auteur",
    "event_date": "Date",
    "event_time": "Heure",
    "event_location": "Lieu",
    "event_organizer": "Organisateur",
    "back_to_home": "Retour à l'accueil",
    "news_title": "Actualités et Mises à jour",
    "news_description": "Restez informé des dernières nouvelles, événements et histoires de la communauté MaghrebItalia",
    "event_title": "Événements et Rencontres",
    "event_description": "Découvrez tous les événements organisés par la communauté MaghrebItalia et participez !",
    "no_results_found": "Aucun résultat trouvé"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('it');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};