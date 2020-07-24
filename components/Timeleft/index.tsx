export const Timeleft = ({
  timeLeft,
  lengthDuration,
}: {
  timeLeft: moment.Duration;
  lengthDuration: moment.Duration;
}) => {
  const percentage =
    (timeLeft.asMilliseconds() / lengthDuration.asMilliseconds()) * 100;

  return (
    <>
      <div className="level">
        <div className="level-item">
          <progress
            style={{ width: '90%' }}
            className="progress is-medium"
            value={percentage}
            max="100"
          >
            {percentage.toString()}%
          </progress>
        </div>
      </div>
      <div className="level">
        <div className="level-item">
          <h5 className="is-size-4">
            <strong>{timeLeft.minutes()}</strong>minutes {timeLeft.seconds()}
            seconds
          </h5>
        </div>
      </div>
    </>
  );
};
