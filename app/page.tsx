import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollVideoSection from "./components/ScrollVideoSection";
import About from "./components/About";
import Menu from "./components/Menu";
import QRSection from "./components/QRSection";
import Loyalty from "./components/Loyalty";
import Stats from "./components/Stats";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";
import CartProvider from "./components/CartProvider";
import Cart from "./components/Cart";
import AIAssistant from "./components/AIAssistant";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <CartProvider>
      <LoadingScreen />
      <Navbar />

      <main>
        <Hero />

        <ScrollVideoSection
          src="/coffee.mp4"
          label="Kahve Sanatı"
          title="Özenle Hazırlanan Kahveler"
          body="Her fincan, seçkin çekirdeklerin gün doğumunda kavrulmasıyla başlar. Barista ellerinde bir ritüele, ilk yudumda bir tutkuya dönüşür."
          align="left"
          blendTop="#2a2020"
          blendBottom="#F5EFE6"
        />

        <About />

        <Menu />

        <ScrollVideoSection
          src="/pizza.mp4"
          label="Taş Fırın"
          title="Taş Fırın Pizzalar"
          body="600 derecelik odun ateşinde, elde açılan ince hamur. Çıtır kenarlar, ipeksi mozzarella ve bahçeden gelen tazelik — her dilimde İtalya."
          align="center"
          blendTop="#FFFCF7"
          blendBottom="#2a2020"
        />

        <ScrollVideoSection
          src="/burger.mp4"
          label="Gurme Mutfak"
          title="Gurme Burgerler"
          body="Günlük çekilen dana, mührlenmiş sululuk, taze brioche ekmek ve imza soslarımız. İlk ısırıkta neden 'gurme' dediğimizi anlayacaksınız."
          align="left"
          blendTop="#2a2020"
          blendBottom="#3B2F2F"
        />

        <QRSection />

        <Loyalty />

        <Stats />

        <Gallery />

        <Reviews />

        <Reservation />
      </main>

      <Footer />

      <Cart />
      <AIAssistant />
      <ScrollReveal />
    </CartProvider>
  );
}
