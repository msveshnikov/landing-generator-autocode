import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Typography, Container, Box, List, ListItem, ListItemText } from '@mui/material';

const Privacy = () => {
    const { isDarkMode } = useTheme();

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Privacy Policy
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Last updated: {new Date().toLocaleDateString()}
            </Typography>

            <Box my={4}>
                <Typography variant="h5" component="h2" gutterBottom>
                    1. Introduction
                </Typography>
                <Typography variant="body1" paragraph>
                    Welcome to the Landing Page Generator. We respect your privacy and are committed
                    to protecting your personal data. This privacy policy will inform you about how
                    we look after your personal data when you visit our website and tell you about
                    your privacy rights and how the law protects you.
                </Typography>
            </Box>

            <Box my={4}>
                <Typography variant="h5" component="h2" gutterBottom>
                    2. Data We Collect
                </Typography>
                <Typography variant="body1" paragraph>
                    We may collect, use, store and transfer different kinds of personal data about
                    you which we have grouped together as follows:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="Identity Data"
                            secondary="includes first name, last name, username or similar identifier"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Contact Data"
                            secondary="includes email address and telephone numbers"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Technical Data"
                            secondary="includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Usage Data"
                            secondary="includes information about how you use our website, products and services"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Generated Content"
                            secondary="includes landing pages, templates, and other content created using our service"
                        />
                    </ListItem>
                </List>
            </Box>

            <Box my={4}>
                <Typography variant="h5" component="h2" gutterBottom>
                    3. How We Use Your Data
                </Typography>
                <Typography variant="body1" paragraph>
                    We will only use your personal data when the law allows us to. Most commonly, we
                    will use your personal data in the following circumstances:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="To provide and maintain our service, including to monitor the usage of our service" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="To manage your account and provide you with customer support" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="To notify you about changes to our service and important announcements" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="To improve our service based on your feedback and usage patterns" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="To comply with legal obligations and resolve any disputes" />
                    </ListItem>
                </List>
            </Box>

            <Box my={4}>
                <Typography variant="h5" component="h2" gutterBottom>
                    4. Data Security
                </Typography>
                <Typography variant="body1" paragraph>
                    We have implemented appropriate technical and organizational security measures
                    designed to protect the security of any personal information we process.
                    However, please also remember that we cannot guarantee that the internet itself
                    is 100% secure. Although we will do our best to protect your personal
                    information, transmission of personal information to and from our Services is at
                    your own risk.
                </Typography>
            </Box>

            <Box my={4}>
                <Typography variant="h5" component="h2" gutterBottom>
                    5. Your Legal Rights
                </Typography>
                <Typography variant="body1" paragraph>
                    Under certain circumstances, you have rights under data protection laws in
                    relation to your personal data, including the right to:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Request access to your personal data" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Request correction of your personal data" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Request erasure of your personal data" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Object to processing of your personal data" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Request restriction of processing your personal data" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Request transfer of your personal data" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Right to withdraw consent" />
                    </ListItem>
                </List>
                <Typography variant="body1" paragraph>
                    You can exercise any of these rights by contacting us using the information
                    provided in the "Contact Us" section.
                </Typography>
            </Box>

            <Box my={4}>
                <Typography variant="h5" component="h2" gutterBottom>
                    6. Third-Party Services
                </Typography>
                <Typography variant="body1" paragraph>
                    Our service may contain links to other websites that are not operated by us. If
                    you click on a third-party link, you will be directed to that third party's
                    site. We strongly advise you to review the Privacy Policy of every site you
                    visit. We have no control over and assume no responsibility for the content,
                    privacy policies or practices of any third-party sites or services.
                </Typography>
            </Box>

            <Box my={4}>
                <Typography variant="h5" component="h2" gutterBottom>
                    7. Changes to This Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    We may update our Privacy Policy from time to time. We will notify you of any
                    changes by posting the new Privacy Policy on this page and updating the "Last
                    updated" date at the top of this Privacy Policy. You are advised to review this
                    Privacy Policy periodically for any changes.
                </Typography>
            </Box>

            <Box my={4}>
                <Typography variant="h5" component="h2" gutterBottom>
                    8. Contact Us
                </Typography>
                <Typography variant="body1" paragraph>
                    If you have any questions about this Privacy Policy or our privacy practices,
                    please contact us at:
                </Typography>
                <Typography variant="body1">Email: privacy@landingpagegenerator.com</Typography>
                <Typography variant="body1">
                    Address: 123 Privacy Street, Web City, Internet 12345
                </Typography>
            </Box>
        </Container>
    );
};

export default Privacy;