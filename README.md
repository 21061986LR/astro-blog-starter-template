---
const treatwellUrl = "https://laylaradestock.mytreatwell.co.uk/";
const instagramUrl = "https://www.instagram.com/foreveryoungbeauty_bylayla";
const facebookUrl = "https://www.facebook.com/share/1QMMfoWi3d/";
const mapsUrl = "https://maps.app.goo.gl/JPxvA3GcFrQov9SN9";
---

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Forever Young Beauty By Layla | Beauty Treatments in Fareham, Portsmouth & Gosport</title>

  <meta
    name="description"
    content="Professional beauty treatments in Fareham, Portsmouth and Gosport. Facials, lashes, brows and beauty treatments. Book online with Forever Young Beauty By Layla through Treatwell."
  />

  <style>
    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #faf7f8;
      color: #333;
      line-height: 1.6;
    }

    .hero {
      background: linear-gradient(135deg, #f8d7da, #fff);
      padding: 80px 20px;
      text-align: center;
    }

    .logo {
      width: 170px;
      height: 170px;
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }

    h1 {
      font-size: clamp(2.5rem, 8vw, 4.8rem);
      color: #c85d7a;
      margin-bottom: 15px;
    }

    h2 {
      text-align: center;
      color: #c85d7a;
      margin-bottom: 20px;
    }

    .hero p {
      max-width: 850px;
      margin: auto;
      font-size: 1.15rem;
    }

    .section {
      max-width: 1100px;
      margin: auto;
      padding: 70px 20px;
    }

    .buttons {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 30px;
    }

    .button {
      display: inline-block;
      background: #c85d7a;
      color: white;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 999px;
      font-weight: bold;
    }

    .button:hover { opacity: 0.9; }

    .cards,
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }

    .card,
    .highlight {
      background: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }

    .highlight {
      text-align: center;
    }

    .gallery img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 18px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      background: white;
    }

    .review-score {
      text-align: center;
      font-size: 1.2rem;
      font-weight: bold;
      color: #c85d7a;
      margin-bottom: 25px;
    }

    footer {
      background: #f1f1f1;
      text-align: center;
      padding: 30px;
      margin-top: 40px;
    }
  </style>
</head>

<body>

  <section class="hero">
    <img class="logo" src="/images/logo.jpg" alt="Forever Young Beauty By Layla logo" />

    <h1>Forever Young Beauty By Layla</h1>

    <p>
      Professional beauty treatments delivered with care, expertise and attention to detail.
      Serving clients across Fareham, Portsmouth, Gosport and the surrounding areas.
      Book your appointment online through Treatwell and discover treatments designed to help you look and feel your best.
    </p>

    <p style="margin-top:20px;font-weight:bold;color:#c85d7a;">
      ★★★★★ Rated 5.0/5 from 527+ verified Treatwell reviews
    </p>

    <div class="buttons">
      <a class="button" href={treatwellUrl} target="_blank">Book Your Appointment</a>
      <a class="button" href={instagramUrl} target="_blank">Instagram</a>
      <a class="button" href={facebookUrl} target="_blank">Facebook</a>
    </div>
  </section>

  <section class="section">
    <h2>Welcome</h2>

    <div class="highlight">
      <p>
        At Forever Young Beauty By Layla, every treatment is tailored to the individual.
        Whether you're preparing for a special occasion, maintaining your regular beauty routine,
        or simply taking time for yourself, you'll receive a professional and friendly service
        focused on achieving the best possible results.
      </p>
    </div>
  </section>

  <section class="section">
    <h2>Treatments</h2>

    <div class="cards">
      <div class="card">
        <h3>Facial Treatments</h3>
        <p>Refresh, rejuvenate and enhance your natural glow with professional facial treatments.</p>
      </div>

      <div class="card">
        <h3>Lashes & Brows</h3>
        <p>Beautiful lash and brow treatments designed to enhance your natural features.</p>
      </div>

      <div class="card">
        <h3>Beauty Services</h3>
        <p>View the latest services, pricing and availability through Treatwell.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <h2>Gallery</h2>

    <div class="gallery">
      <img src="/images/facial-treatment.jpg" alt="Facial treatment by Layla" />
      <img src="/images/hairline-treatment.jpg" alt="Hairline treatment before and after" />
      <img src="/images/review-shelley.jpg" alt="Client review for Forever Young Beauty By Layla" />
    </div>
  </section>

  <section class="section">
    <h2>What Clients Say</h2>

    <p class="review-score">
      ★★★★★ 5.0 Rating from 527+ verified Treatwell reviews
    </p>

    <div class="cards">
      <div class="card">
        <p>
          "Layla is always excellent. Very professional, thorough and attentive.
          The treatment is carried out in a calm and relaxing environment."
        </p>
      </div>

      <div class="card">
        <p>
          "Layla is amazing. I'm a regular now. Her treatments are fantastic and
          always leave me feeling refreshed and confident."
        </p>
      </div>

      <div class="card">
        <p>
          "Friendly, professional and incredibly relaxing. I wouldn't go anywhere else."
        </p>
      </div>
    </div>

    <div class="buttons">
      <a class="button" href={treatwellUrl} target="_blank">Read More Reviews</a>
    </div>
  </section>

  <section class="section">
    <h2>Visit Forever Young Beauty By Layla</h2>

    <div class="highlight">
      <p>
        Based at Beauty at Abshot, Abshot Country Club, Titchfield Common,
        conveniently located for clients across Fareham, Portsmouth, Gosport and surrounding areas.
      </p>

      <p>
        Beauty at Abshot<br />
        Abshot Country Club<br />
        Little Abshot Road<br />
        Titchfield Common<br />
        Fareham<br />
        PO14 4LN
      </p>

      <div class="buttons">
        <a class="button" href={mapsUrl} target="_blank">View on Google Maps</a>
        <a class="button" href={treatwellUrl} target="_blank">Book Online Now</a>
      </div>
    </div>
  </section>

  <section class="section">
    <h2>Follow Forever Young Beauty By Layla</h2>

    <p style="text-align:center;">
      Stay up to date with the latest treatments, beauty tips, client results and special offers.
    </p>

    <div class="buttons">
      <a class="button" href={instagramUrl} target="_blank">Instagram</a>
      <a class="button" href={facebookUrl} target="_blank">Facebook</a>
    </div>
  </section>

  <footer>
    <p>
      Forever Young Beauty By Layla © 2026<br />
      Professional Beauty Treatments | Fareham, Portsmouth & Gosport
    </p>
  </footer>

</body>
</html>
