export function delay(cb) {
  // Give throttled scroll listeners time to settle down.
  requestAnimationFrame(() => setTimeout(cb));
}

export default function run(steps) {
  let i = 0;

  return () => {
    if (i === steps.length) {
      return;
    }

    delay(steps[i++]);
  };
}
