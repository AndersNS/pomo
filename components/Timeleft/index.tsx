import { getColorClass, Color } from '../../utils';
import Head from 'next/head';

export const Timeleft = ({
  timeLeft,
  lengthDuration,
  color,
}: {
  timeLeft: moment.Duration;
  lengthDuration: moment.Duration;
  color: Color;
}) => {
  const percentage =
    (timeLeft.asMilliseconds() / lengthDuration.asMilliseconds()) * 100;

  return (
    <>
      <Head>
        <title>
          {timeLeft.minutes().toString().padStart(2, '0')}:
          {timeLeft.seconds().toString().padStart(2, '0')}
        </title>
      </Head>
      <div className="level">
        <div className="level-item">
          <progress
            style={{ width: '90%' }}
            className={`progress is-medium ${getColorClass(color)}`}
            value={percentage}
            max="100"
          >
            {percentage.toString()}%
          </progress>
        </div>
      </div>
      <h4 className="is-size-4 mt-1">
        <strong>{timeLeft.minutes()}</strong>minutes{' '}
        <strong>{timeLeft.seconds()}</strong> seconds
      </h4>
    </>
  );
};
