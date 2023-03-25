import { Link } from "../Link";

const i18n = {
  es: {
    title: "Acerca de",
    description: "Creando un clon de react-router",
  },
  en: {
    title: "About",
    description: "Creating a react-router clone",
  },
};

const useI18n = (lang) => {
  return i18n[lang] || i18n.en;
};

export default function AboutPage({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? "en");
  return (
    <>
      <h1>{i18n.title}</h1>
      <p>{i18n.description}</p>
      <Link to="/">Home</Link>
    </>
  );
}
