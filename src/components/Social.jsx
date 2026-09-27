import React, { useEffect, useState, useContext } from 'react';
import { SocialIcon } from 'react-social-icons';
import { ThemeContext } from 'styled-components';
import { SiGmail } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import endpoints from '../constants/endpoints';

// Map untuk komponen dari react-icons
const iconMap = {
  gmail: <SiGmail size={20} />,
  linkedin: <FaLinkedin size={20} />,
};

const styles = {
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  // Style khusus lingkaran react-icons agar ukurannya presisi dengan react-social-icons
  customIconStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: '50%',
  },
};

function Social() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.social, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="social">
      {data ? data.social.map((social) => {
        // Jika network adalah 'email', gunakan react-social-icons
        if (social.network === 'email') {
          return (
            <SocialIcon
              key={social.network}
              style={styles.iconStyle}
              url={social.href}
              network={social.network}
              bgColor={theme.socialIconBgColor}
              fgColor={theme.background}
              target="_blank"
              rel="noopener"
            />
          );
        }

        // Untuk network lain (gmail, linkedin, dll.), gunakan react-icons
        return (
          <a
            key={social.network}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...styles.customIconStyle,
              backgroundColor: theme.socialIconBgColor,
              color: theme.background,
            }}
          >
            {iconMap[social.network]}
          </a>
        );
      }) : null}
    </div>
  );
}

export default Social;