import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const ProjectCard = ({ project, featured = false }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const parseBodyText = (text) => <ReactMarkdown>{text}</ReactMarkdown>;

  const isVideo = project?.image && /\.(mp4|webm|ogg|mov)$/i.test(project.image);

  // Ekstrak path dasar file video tanpa ekstensi untuk fallback WebM / MP4
  const videoBasePath = isVideo ? project.image.replace(/\.(mp4|webm|ogg|mov)$/i, '') : '';

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleVideoClick = () => {
    if (isVideo) {
      if (isPlaying) {
        handlePause();
      } else {
        handlePlay();
      }
    }
  };

  return (
    <article
      className={`tile tile--interactive project-card ${
        featured ? 'span-4 project-card--featured' : 'span-2'
      }`}
      onMouseEnter={handlePlay}
      onMouseLeave={handlePause}
      onClick={handleVideoClick}
    >
      {project?.image && (
        <div className="project-card__media">
          {isVideo ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="metadata"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              >
                {/* 1. Prioritaskan format WebM untuk loading yang lebih cepat */}
                <source src={`${videoBasePath}.webm`} type="video/webm" />
                {/* 2. Fallback ke format MP4 jika browser tidak mendukung WebM */}
                <source src={`${videoBasePath}.mp4`} type="video/mp4" />
                Browser Anda tidak mendukung pemutar video HTML5.
              </video>

              <a
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                title="Buka video di tab baru"
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  backdropFilter: 'blur(4px)',
                  zIndex: 2,
                }}
              >
                For full screen, open on new tab. ↗
              </a>

              {!isPlaying && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    color: '#fff',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                >
                  <span style={{ color: '#00f2fe', fontSize: '0.8rem' }}>▶</span>
                  Hover / tap here
                </div>
              )}
            </div>
          ) : (
            <img src={project.image} alt={project.title} />
          )}
        </div>
      )}

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        
        {/* Tampilan Lokasi Proyek */}
        {project?.location && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.825rem',
              opacity: 0.8,
              marginTop: '4px',
              marginBottom: '10px',
            }}
          >
            <span>📍</span>
            <span>{project.location}</span>
          </div>
        )}

        <div className="project-card__text">{parseBodyText(project.bodyText)}</div>
      </div>

      <div className="project-card__footer">
        {project?.links?.length > 0 && (
          <div className="project-card__links">
            {project.links.map((link) => (
              <a
                key={link.href}
                className="proj-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {link.text}
                {' '}
                ↗
              </a>
            ))}
          </div>
        )}
        {project?.tags?.length > 0 && (
          <div className="project-card__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

ProjectCard.propTypes = {
  featured: PropTypes.bool,
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    location: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;