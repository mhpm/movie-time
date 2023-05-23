import styled from "@emotion/styled";

type ImageProps = {
  url: string;
};

const Background = styled.div<ImageProps>`
  background-image: linear-gradient(
      to top,
      rgba(20 20 20 / var(--tw-bg-opacity)),
      rgba(0, 0, 0, 0)
    ),
    url(${(props) => props.url});
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
`;

const GradientBackground = ({
  url,
  className,
}: {
  url: string;
  className: string;
}) => {
  return <Background className={className} url={url} />;
};

export default GradientBackground;
