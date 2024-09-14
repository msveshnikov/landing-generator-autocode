import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Terms = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`container ${isDarkMode ? 'dark-mode' : ''}`} style={{ padding: '20px' }}>
            <h1>Terms of Service</h1>
            <section>
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using the Landing Page Generator, you agree to be bound by these
                    Terms of Service and all applicable laws and regulations. If you do not agree
                    with any part of these terms, you may not use our service.
                </p>
            </section>
            <section>
                <h2>2. Use License</h2>
                <p>
                    Permission is granted to temporarily download one copy of the materials
                    (information or software) on Landing Page Generator's website for personal,
                    non-commercial transitory viewing only. This is the grant of a license, not a
                    transfer of title, and under this license you may not:
                </p>
                <ul>
                    <li>modify or copy the materials;</li>
                    <li>
                        use the materials for any commercial purpose, or for any public display
                        (commercial or non-commercial);
                    </li>
                    <li>
                        attempt to decompile or reverse engineer any software contained on Landing
                        Page Generator's website;
                    </li>
                    <li>
                        remove any copyright or other proprietary notations from the materials; or
                    </li>
                    <li>
                        transfer the materials to another person or "mirror" the materials on any
                        other server.
                    </li>
                </ul>
            </section>
            <section>
                <h2>3. Disclaimer</h2>
                <p>
                    The materials on Landing Page Generator's website are provided on an 'as is'
                    basis. Landing Page Generator makes no warranties, expressed or implied, and
                    hereby disclaims and negates all other warranties including, without limitation,
                    implied warranties or conditions of merchantability, fitness for a particular
                    purpose, or non-infringement of intellectual property or other violation of
                    rights.
                </p>
            </section>
            <section>
                <h2>4. Limitations</h2>
                <p>
                    In no event shall Landing Page Generator or its suppliers be liable for any
                    damages (including, without limitation, damages for loss of data or profit, or
                    due to business interruption) arising out of the use or inability to use the
                    materials on Landing Page Generator's website, even if Landing Page Generator or
                    a Landing Page Generator authorized representative has been notified orally or
                    in writing of the possibility of such damage.
                </p>
            </section>
            <section>
                <h2>5. Accuracy of Materials</h2>
                <p>
                    The materials appearing on Landing Page Generator's website could include
                    technical, typographical, or photographic errors. Landing Page Generator does
                    not warrant that any of the materials on its website are accurate, complete or
                    current. Landing Page Generator may make changes to the materials contained on
                    its website at any time without notice. However, Landing Page Generator does not
                    make any commitment to update the materials.
                </p>
            </section>
            <section>
                <h2>6. Links</h2>
                <p>
                    Landing Page Generator has not reviewed all of the sites linked to its website
                    and is not responsible for the contents of any such linked site. The inclusion
                    of any link does not imply endorsement by Landing Page Generator of the site.
                    Use of any such linked website is at the user's own risk.
                </p>
            </section>
            <section>
                <h2>7. Modifications</h2>
                <p>
                    Landing Page Generator may revise these terms of service for its website at any
                    time without notice. By using this website you are agreeing to be bound by the
                    then current version of these terms of service.
                </p>
            </section>
            <section>
                <h2>8. Governing Law</h2>
                <p>
                    These terms and conditions are governed by and construed in accordance with the
                    laws of [Your Country] and you irrevocably submit to the exclusive jurisdiction
                    of the courts in that State or location.
                </p>
            </section>
            <section>
                <h2>9. User Accounts</h2>
                <p>
                    You are responsible for maintaining the confidentiality of your account and
                    password. You agree to accept responsibility for all activities that occur under
                    your account or password. You must notify us immediately upon becoming aware of
                    any breach of security or unauthorized use of your account.
                </p>
            </section>
            <section>
                <h2>10. Intellectual Property</h2>
                <p>
                    The Landing Page Generator and its original content, features, and functionality
                    are owned by Landing Page Generator and are protected by international copyright,
                    trademark, patent, trade secret, and other intellectual property or proprietary
                    rights laws.
                </p>
            </section>
            <section>
                <h2>11. Termination</h2>
                <p>
                    We may terminate or suspend your account and bar access to the Service
                    immediately, without prior notice or liability, under our sole discretion, for
                    any reason whatsoever and without limitation, including but not limited to a
                    breach of the Terms.
                </p>
            </section>
        </div>
    );
};

export default Terms;