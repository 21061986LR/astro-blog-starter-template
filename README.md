---
const treatwellUrl = "https://laylaradestock.mytreatwell.co.uk/";
const instagramUrl = "https://www.instagram.com/foreveryoungbeauty_bylayla/";
const facebookUrl = "https://www.facebook.com/share/1QMMfoWi3d/";
---

<html lang="en">
<head>
  <title>Forever Young Beauty By Layla | Beauty Treatments</title>
  <meta name="description" content="Forever Young Beauty By Layla. Beauty treatments with easy online booking through Treatwell." />
</head>

<body>
  <a class="floating-book" href={treatwellUrl} target="_blank">Book Now</a>

  <header class="hero">
    <nav>
      <strong>Forever Young Beauty By Layla</strong>
      <a href={treatwellUrl} target="_blank">Book</a>
    </nav>

    <section class="hero-content">
      <p class="eyebrow">Beauty • Confidence • Self-care</p>
      <h1>Forever Young Beauty By Layla</h1>
      <p>Professional beauty treatments with simple online booking through Treatwell.</p>

      <div class="buttons">
        <a class="button" href={treatwellUrl} target="_blank">Book on Treatwell</a>
        <a class="button instagram" href={instagramUrl} target="_blank">Instagram</a>
        <a class="button facebook" href={facebookUrl} target="_blank">Facebook</a>
      </div>
    </section>
  </header>

  <main>
    <section class="section">
      <h2>Treatments</h2>
      <div class="grid">
        <div class="card">
          <h3>Facials</h3>
          <p>Relaxing facial treatments designed to refresh and revive your skin.</p>
        </div>
        <div class="card">
          <h3>Lashes & Brows</h3>
          <p>Enhance your natural look with beautifully finished lashes and brows.</p>
        </div>
        <div class="card">
          <h3>Beauty Treatments</h3>
          <p>Explore the latest available services and prices through Treatwell.</p>
        </div>
      </div>
    </section>

    <section class="section alt">
      <h2>Client Results</h2>
      <p>Add before-and-after photos here when ready.</p>

      <div class="gallery">
        <div>Before / After</div>
        <div>Treatment Result</div>
        <div>Client Look</div>
      </div>
    </section>

    <section class="section">
      <h2>What Clients Say</h2>
      <div class="grid">
        <div class="card">
          <p>“Lovely experience and very professional.”</p>
        </div>
        <div class="card">
          <p>“Beautiful results — highly recommend.”</p>
        </div>
        <div class="card">
          <p>“Friendly, relaxing and easy to book.”</p>
        </div>
      </div>
    </section>

    <section class="section alt">
      <h2>Find Us</h2>
      <p>Forever Young Beauty By Layla</p>
      <p>Fareham / Portsmouth area</p>
      <a class="button" href={treatwellUrl} target="_blank">View Availability</a>
    </section>

    <section class="section social">
      <h2>Follow Us</h2>
      <p>See the latest treatments, offers and client results.</p>

      <div class="buttons">
        <a class="button instagram" href={instagramUrl} target="_blank">Instagram</a>
        <a class="button facebook" href={facebookUrl} target="_blank">Facebook</a>
      </div>
    </section>
  </main>

  <footer>
    <p>© 2026 Forever Young Beauty By Layla</p>
  </footer>
</body>
</html>

<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #fff8fb;
    color: #2b2326;
  }

  .hero {
    min-height: 100vh;
    background: linear-gradient(135deg, #fff7fb, #f3bfd3);
    padding: 24px;
  }

  nav {
    max-width: 1100px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav a {
    color: #2b2326;
    font-weight: bold;
    text-decoration: none;
  }

  .hero-content {
    max-width: 820px;
    margin: 120px auto 0;
    text-align: center;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
  }

  h1 {
    font-size: clamp(2.8rem, 8vw, 5.8rem);
    line-height: 1;
    margin: 20px 0;
  }

  h2 {
    font-size: 2.2rem;
    margin-bottom: 18px;
  }

  .hero p {
    font-size: 1.25rem;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 30px;
  }

  .button {
    display: inline-block;
    background: #2b2326;
    color: white;
    text-decoration: none;
    padding: 14px 24px;
    border-radius: 999px;
    font-weight: bold;
  }

  .instagram {
    background: #E1306C;
  }

  .facebook {
    background: #1877F2;
  }

  .section {
    max-width: 1100px;
    margin: auto;
    padding: 80px 24px;
    text-align: center;
  }

  .alt {
    background: white;
    max-width: none;
  }

  .grid {
    max-width: 1100px;
    margin: 30px auto 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }

  .card {
    background: white;
    padding: 30px;
    border-radius: 24px;
    box-shadow: 0 12px 35px rgba(80, 30, 50, 0.08);
  }

  .alt .card {
    background: #fff8fb;
  }

  .gallery {
    max-width: 1000px;
    margin: 30px auto 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  .gallery div {
    min-height: 220px;
    background: #f3bfd3;
    border-radius: 24px;
    display: grid;
    place-items: center;
    font-weight: bold;
  }

  .floating-book {
    position: fixed;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    background: #2b2326;
    color: white;
    text-decoration: none;
    padding: 14px 22px;
    border-radius: 999px;
    font-weight: bold;
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }

  footer {
    background: #2b2326;
    color: white;
    text-align: center;
    padding: 28px;
  }

  @media (max-width: 760px) {
    nav {
      flex-direction: column;
      gap: 14px;
    }

    .hero-content {
      margin-top: 80px;
    }

    .grid,
    .gallery {
      grid-template-columns: 1fr;
    }
  }
</style>
