const PrivacyPage = () => {
  return (
    <div className="container py-5">
      <h1 className="display-4 text-center mb-5">Privacy Policy</h1>
      <div className="mx-auto" style={{ maxWidth: '800px' }}>
        <p>
          Welcome to our streaming platform. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our services.
        </p>

        <h2 className="h4 mt-4">1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item">Personal identification information (name, email address, billing information, etc.)</li>
          <li className="list-group-item">Account activity (watch history, preferences, ratings, etc.)</li>
          <li className="list-group-item">Device and usage data (IP address, browser type, operating system, etc.)</li>
        </ul>

        <h2 className="h4 mt-4">2. How We Use Your Information</h2>
        <p>Your information is used to:</p>
        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item">Provide and personalize your streaming experience</li>
          <li className="list-group-item">Process payments and manage your account</li>
          <li className="list-group-item">Improve our platform and develop new features</li>
          <li className="list-group-item">Send you updates, promotions, and important service information</li>
        </ul>

        <h2 className="h4 mt-4">3. Sharing Your Information</h2>
        <p>We do not sell your personal data. We may share information with trusted third-party service providers to perform essential functions such as payment processing, analytics, and customer support. These providers are obligated to protect your information and use it only for the services they provide to us.</p>

        <h2 className="h4 mt-4">4. Your Privacy Choices</h2>
        <p>You have the right to access, update, or delete your personal information. You may also opt out of certain communications by adjusting your account settings or contacting our support team.</p>

        <h2 className="h4 mt-4">5. Security Measures</h2>
        <p>We implement industry-standard security measures to protect your information from unauthorized access, disclosure, or misuse.</p>

        <h2 className="h4 mt-4">6. Children’s Privacy</h2>
        <p>Our service is not intended for individuals under the age of 13. We do not knowingly collect personal information from children without parental consent.</p>

        <h2 className="h4 mt-4">7. Updates to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes and update the effective date accordingly.</p>

        <p className="mt-4">If you have any questions about our Privacy Policy, please contact us through our support page.</p>
      </div>
    </div>
  );
};

export default PrivacyPage;