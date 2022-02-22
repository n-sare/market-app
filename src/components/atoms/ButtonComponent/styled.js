import styled from 'styled-components';
import { Button } from 'antd';

const base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height}em;
`;

export const StyledCardButton = styled(Button)`
  background-color: #1EA4CE;
  width: 100%;
`;

export default styled(base)({});
