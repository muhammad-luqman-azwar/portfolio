import React, { useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';
import '../css/projects.css';

const Projects = (props) => {
  const { header } = props;
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  // UBAH KE true UNTUK MAINTENANCE, UBAH KE false JIKA SUDAH SIAP DITAMPILKAN
  const isMaintenance = true;

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const numberOfItems = showMore && data ? data.projects.length : 6;

  return (
    <>
      <Header title={header} />
      {isMaintenance ? (
        <div className="section-content-container">
          <Fade triggerOnce>
            <div
              style={{
                padding: '3rem 2rem',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                textAlign: 'center',
                margin: '2rem auto',
                maxWidth: '600px',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '0.35rem 0.8rem',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(255, 107, 107, 0.15)',
                  color: '#ff6b6b',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                  border: '1px solid rgba(255, 107, 107, 0.3)',
                }}
              >
                HTTP 503 SERVICE UNAVAILABLE
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.8rem', color: '#fff' }}>
                🚧 Under Maintenance 🚧
              </h3>
              <p style={{ opacity: 0.8, lineHeight: '1.6', margin: 0 }}>
                The projects page is currently undergoing content updates and will be uploaded in stages soon.
              </p>
            </div>
          </Fade>
        </div>
      ) : (
        data ? (
          <div className="section-content-container">
            <Fade triggerOnce>
              <div className="bento">
                {data.projects?.slice(0, numberOfItems).map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    featured={index === 0}
                  />
                ))}
              </div>
            </Fade>

            {!showMore && data.projects?.length > numberOfItems && (
              <div className="projects-more">
                <button
                  type="button"
                  className="btn-pill btn-ghost"
                  onClick={() => setShowMore(true)}
                >
                  Show more
                </button>
              </div>
            )}
          </div>
        ) : <FallbackSpinner />
      )}
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;