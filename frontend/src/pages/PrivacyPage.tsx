const PrivacyPage = () => {
  return (
    <div className="privacy-page-wrapper d-flex justify-content-center align-items-start min-vh-100 p-4">
      <div className="p-5 rounded-4 shadow-lg w-100 privacy-card">
        <h1 className="display-5 fw-bold text-center mb-4">Privacy Policy</h1>

        <p className="lead">
          Welcome to our streaming platform. Your privacy is important to us.
          This Privacy Policy outlines how we collect, use, and safeguard your
          information when you use our services.
        </p>

        <hr className="my-4" />

        <section className="mb-5">
          <h2 className="h5 fw-semibold">1. Information We Collect</h2>
          <ul className="ps-3 mt-2">
            <li>
              Personal identification information (name, email, billing info)
            </li>
            <li>Account activity (watch history, preferences, ratings)</li>
            <li>Device and usage data (IP address, browser, OS)</li>
          </ul>
        </section>

        <section className="mb-5">
          <h2 className="h5 fw-semibold">2. How We Use Your Information</h2>
          <ul className="ps-3 mt-2">
            <li>Provide and personalize your streaming experience</li>
            <li>Process payments and manage your account</li>
            <li>Improve our platform and develop new features</li>
            <li>Send you updates, promotions, and important service info</li>
          </ul>
        </section>

        <section className="mb-5">
          <h2 className="h5 fw-semibold">3. Sharing Your Information</h2>
          <p>
            We do not sell your personal data. We may share information with
            trusted third-party service providers for payment processing,
            analytics, and customer support. These providers are required to
            protect your data and use it only for those purposes.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="h5 fw-semibold">4. Your Privacy Choices</h2>
          <p>
            You may access, update, or delete your information at any time. You
            can also opt out of certain communications by adjusting your account
            settings or contacting support.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="h5 fw-semibold">5. Security Measures</h2>
          <p>
            We implement industry-standard security measures to safeguard your
            information from unauthorized access or misuse.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="h5 fw-semibold">6. Children’s Privacy</h2>
          <p>
            Our service is not intended for children under 13. We do not
            knowingly collect information from children without parental
            consent.
          </p>
        </section>

        <section>
          <h2 className="h5 fw-semibold">7. Updates to This Policy</h2>
          <p>
            We may update this policy periodically. Significant changes will be
            communicated, and the policy’s effective date will be revised.
          </p>
        </section>

        <p className="mt-5 mb-0 text-center">
          For questions about this policy, please reach out through our support
          page.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
