import React from 'react';

const SideVideoCard = ({ video }) => {
  return (
    <div style={styles.card} className='transform transition duration-300 hover:scale-105  '>
      <img src={video.thumbnailUrl} alt={video.title} style={styles.thumbnail} />
      <div style={styles.info}>
        <h4 style={styles.title}>{video.title}</h4>
        <p style={styles.channel}>{video.channelName}</p>
        <p style={styles.views}>{video.views } : views </p>

        
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
  },
  thumbnail: {
    width: '120px',
    height: '70px',
    borderRadius: '5px',
    objectFit: 'cover',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
  },
  channel: {
    fontSize: '12px',
    color: '#666',
  },
  views: {
    fontSize: '12px',
    color: '#666',
  }
};

export default SideVideoCard;
