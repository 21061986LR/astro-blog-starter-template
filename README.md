---
const logoImage = "/images/Layla logo.jpg";
const heroImage = "/images/layla-treatment.jpg";
const hairlineImage = "/images/hairline-treatment.jpg";
const reviewImage = "/images/Shelley review.jpg";
---

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Forever Young Beauty by Layla | Aesthetics & Beauty Treatments Portsmouth</title>

  <meta
    name="description"
    content="Professional aesthetics and beauty treatments in Portsmouth. Anti-wrinkle treatments, dermal fillers, skin rejuvenation and beauty services. Over 500 verified client reviews."
  />

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      color: #333;
      line-height: 1.6;
      background: #fff;
    }

    header {
      text-align: center;
      padding: 20px;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,.08);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .logo {
      width: 140px;
      border-radius: 50%;
    }

    .hero {
      background: #f8f8f8;
      text-align: center;
      padding: 60px 20px;
    }

    .hero img {
      width: 100%;
      max-width: 500px;
      border-radius: 16px;
      margin-bottom: 25px;
    }

    h1 {
      font-size: 2.8rem;
      margin-bottom: 15px;
    }

    h2 {
      text-align: center;
      margin-bottom: 30px;
    }

    .hero p {
      max-width: 700px;
      margin: 0 auto 25px;
      font-size: 1.1rem;
    }

    .button {
      display: inline-block;
      background: #d4af37;
      color: white;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 8px;
      font-weight: bold;
      transition: 0.3s;
    }

    .button:hover {
      opacity: 0.9;
    }

    section {
      padding: 70px 20px;
      max-width: 1200px;
      margin: auto;
    }

    .services {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }

    .card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,.08);
    }

    .card img {
      width: 100%;
      display: block;
    }

    .card-content {
      padding: 20px;
      text-align: center;
    }

    .reviews {
      background: #f8f8f8;
      text-align: center;
    }

    .reviews img {
      width: 100%;
      max-width: 650px;
      border-radius: 16px;
      margin-bottom: 20px;
    }

    .review-highlight {
      font-size: 1.3rem;
      font-weight: bold;
      margin-bottom: 15px;
    }

    .contact {
      text-align: center;
    }

    .contact p {
      margin-bottom: 12px;
    }

    footer {
      background: #222;
      color: white;
      text-align: center;
      padding: 30px;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }
    }
  </style>
</head>

<body>

<header>
  <img src={logoImage} alt="Forever Young Beauty by Layla" class="logo" />
</header>

<section class="hero">
  <img src={heroImage} alt="Beauty Treatment by Layla" />

  <h1>Forever Young Beauty by Layla</h1>

  <p>
    Professional aesthetics and beauty treatments in Portsmouth,
    helping clients look and feel their best through safe,
    personalised and high-quality treatments.
  </p>

  <a
    href="https://www.treatwell.co.uk/place/forever-young-beauty-by-layla/"
    target="_blank"
    class="button"
  >
    Book Online
  </a>
</section>

<section>
  <h2>Popular Treatments</h2>

  <div class="services">

    <div class="card">
      <img src={heroImage} alt="Beauty Treatments" />
      <div class="card-content">
        <h3>Aesthetic Treatments</h3>
        <p>
          Advanced aesthetic treatments tailored to enhance your
          natural beauty and confidence.
        </p>
      </div>
    </div>

    <div class="card">
      <img src={hairlineImage} alt="Hairline Treatment" />
      <div class="card-content">
        <h3>Hairline Treatments</h3>
        <p>
          Specialist hairline and skin rejuvenation treatments
          delivered with care and expertise.
        </p>
      </div>
    </div>

  </div>
</section>

<section class="reviews">
  <h2>What Clients Say</h2>

  <img src={reviewImage} alt="Client Review" />

  <p class="review-highlight">
    ⭐ Over 500 Verified Client Reviews
  </p>

  <p>
    Trusted by clients across Portsmouth and Hampshire for
    professional, friendly and high-quality aesthetic and beauty
    treatments.
  </p>

  <br />

  <a
    href="https://maps.app.goo.gl/JPxvA3GcFrQov9SN9"
    target="_blank"
    class="button"
  >
    View Google Reviews
  </a>
</section>

<section class="contact">
  <h2>Book Your Appointment</h2>

  <p>
    Ready to start your journey?
  </p>

  <p>
    Book directly through Treatwell or view our latest reviews on Google.
  </p>

  <br />

  <a
    href="https://www.treatwell.co.uk/place/forever-young-beauty-by-layla/"
    target="_blank"
    class="button"
  >
    Book Now
  </a>
</section>

<footer>
  <p><strong>Forever Young Beauty by Layla</strong></p>
  <p>Portsmouth, Hampshire</p>
  <p>Over 500 Verified Client Reviews</p>
</footer>

</body>
</html>
