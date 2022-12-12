import '../../styles/general.scss';
import { Link } from 'react-router-dom';

const PostCard = (props) => {
  const date = new Date(props.date);
  const date_formated = date.toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <Link to={`/post/${props.id}`}>
      <div className="post-card">
        <h1 className="title">{props.title}</h1>
        <p className="description">{props.description}</p>
        <p className="date">{date_formated}</p>
      </div>
    </Link>
  );
};

export default PostCard;
