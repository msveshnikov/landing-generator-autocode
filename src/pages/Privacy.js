import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Privacy = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
            <h1>Privacy Policy</h1>
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <section>
                <h2>1. Introduction</h2>
                <p>
                    Welcome to the Landing Page Generator. We respect your privacy and are committed
                    to protecting your personal data. This privacy policy will inform you about how
                    we look after your personal data when you visit our website and tell you about
                    your privacy rights and how the law protects you.
                </p>
            </section>

            <section>
                <h2>2. Data We Collect</h2>
                <p>
                    We may collect, use, store and transfer different kinds of personal data about
                    you which we have grouped together as follows:
                </p>
                <ul>
                    <li>
                        Identity Data: includes first name, last name, username or similar
                        identifier
                    </li>
                    <li>Contact Data: includes email address and telephone numbers</li>
                    <li>
                        Technical Data: includes internet protocol (IP) address, your login data,
                        browser type and version, time zone setting and location, browser plug-in
                        types and versions, operating system and platform, and other technology on
                        the devices you use to access this website
                    </li>
                    <li>
                        Usage Data: includes information about how you use our website, products and
                        services
                    </li>
                    <li>
                        Generated Content: includes landing pages, templates, and other content
                        created using our service
                    </li>
                </ul>
            </section>

            <section>
                <h2>3. How We Use Your Data</h2>
                <p>
                    We will only use your personal data when the law allows us to. Most commonly, we
                    will use your personal data in the following circumstances:
                </p>
                <ul>
                    <li>
                        To provide and maintain our service, including to monitor the usage of our
                        service
                    </li>
                    <li>To manage your account and provide you with customer support</li>
                    <li>To notify you about changes to our service and important announcements</li>
                    <li>To improve our service based on your feedback and usage patterns</li>
                    <li>To comply with legal obligations and resolve any disputes</li>
                </ul>
            </section>

            <section>
                <h2>4. Data Security</h2>
                <p>
                    We have implemented appropriate technical and organizational security measures
                    designed to protect the security of any personal information we process.
                    However, please also remember that we cannot guarantee that the internet itself
                    is 100% secure. Although we will do our best to protect your personal
                    information, transmission of personal information to and from our Services is at
                    your own risk.
                </p>
            </section>

            <section>
                <h2>5. Your Legal Rights</h2>
                <p>
                    Under certain circumstances, you have rights under data protection laws in
                    relation to your personal data, including the right to:
                </p>
                <ul>
                    <li>Request access to your personal data</li>
                    <li>Request correction of your personal data</li>
                    <li>Request erasure of your personal data</li>
                    <li>Object to processing of your personal data</li>
                    <li>Request restriction of processing your personal data</li>
                    <li>Request transfer of your personal data</li>
                    <li>Right to withdraw consent</li>
                </ul>
                <p>
                    You can exercise any of these rights by contacting us using the information
                    provided in the "Contact Us" section.
                </p>
            </section>

            <section>
                <h2>6. Third-Party Services</h2>
                <p>
                    Our service may contain links to other websites that are not operated by us. If
                    you click on a third-party link, you will be directed to that third party's
                    site. We strongly advise you to review the Privacy Policy of every site you
                    visit. We have no control over and assume no responsibility for the content,
                    privacy policies or practices of any third-party sites or services.
                </p>
            </section>

            <section>
                <h2>7. Changes to This Privacy Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time. We will notify you of any
                    changes by posting the new Privacy Policy on this page and updating the "Last
                    updated" date at the top of this Privacy Policy. You are advised to review this
                    Privacy Policy periodically for any changes.
                </p>
            </section>

            <section>
                <h2>8. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy or our privacy practices,
                    please contact us at:
                </p>
                <p>Email: privacy@landingpagegenerator.com</p>
                <p>Address: 123 Privacy Street, Web City, Internet 12345</p>
            </section>
        </div>
    );
};

export default Privacy;
