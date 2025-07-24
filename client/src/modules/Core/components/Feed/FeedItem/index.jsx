import React, { useMemo } from "react";
import cx from "classnames";
import { noop } from "lodash";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "../../ui-kit/Text";
import { formatDate } from "modules/Core/utils/date";
import styles from "./styles.module.scss";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import ConditionalContainer from "../../ui-kit/ConditionalContainer";

const FeedItem = ({ name, text, createdAt, onClick = noop, className, header = true, textProps, children, headerChildren = null, shouldRenderText, ...props }) => {
   const date = useMemo(() => formatDate(createdAt), [createdAt]);
   return (
      <Container className={cx(styles.container, className)} onClick={onClick} {...props}>
         <FeedItem.Header name={name} shouldRender={!!header} headerChildren={headerChildren ?? date} />
         <ConditionalContainer className={styles.textContainer} shouldRender={shouldRenderText} >
            <Text text={text}  {...textProps} />
         </ConditionalContainer>
         {children}
      </Container>
   )
};

FeedItem.Header = withShouldRender(({ name, date, headerChildren }) => (
   <Container className={styles.headingContainer}>
      <Title text={name} />
      <span> {headerChildren}</span>
   </Container>
))

export default FeedItem

