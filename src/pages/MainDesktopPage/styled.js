import styled from 'styled-components';
import { Typography } from 'antd';

const {Text} = Typography;

const base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e5e5;
  height: ${({ height }) => height}em;
`;

export const StyledBody = styled.body`
  background-color: #e5e5e5;
`;

export default styled(base)({});
