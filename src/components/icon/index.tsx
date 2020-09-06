import React from 'react';
import classnames from 'classnames';
import '@fortawesome/fontawesome-free/css/all.css';

interface Props {
  className?: Optional<string>;
  name: string;
  isSolid?: boolean;
}

const Icon: React.FC<Props> = ({ name, className, isSolid }) => {
  const rootClass = classnames(
    {
      fa: !isSolid,
      fas: isSolid,
      [`fa-${name.replace('fa-', '')}`]: true,
    },
    className,
  );

  return <i className={rootClass} />;
};

export default Icon;
