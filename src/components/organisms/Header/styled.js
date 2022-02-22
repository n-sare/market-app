import styled from 'styled-components';
import { Typography } from 'antd';

const {Text} = Typography;

const base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height}em;
`;

export default styled(base)({});
