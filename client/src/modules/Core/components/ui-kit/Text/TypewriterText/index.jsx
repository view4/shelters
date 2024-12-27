import React, { Component } from "react";
import Container from "../../Container";
import Text from "..";
import styles from "./styles.module.scss";


const period = 360;

class TypewriterText extends Component {
    constructor(props) {
        super(props);
        this.whoAmI = this.whoAmI.bind(this);
    };
    state = {
        text: "",
        statements: [],
        loopNumber: 0,
        isDeleting: false
    };

    componentDidMount() {
        this.interval = setTimeout(this.whoAmI, 1500);
        this.setState({ statements: this.props.statements })
    }

    whoAmI = () => {
        let { text, isDeleting, loopNumber, statements } = this.state;
        let delta = 200 - Math.random() * 100;
        const i = loopNumber % statements.length;
        let fullText = statements[i];

        if (isDeleting) {
            text = fullText.substring(0, text.length - 1);
            delta /= 2;
        } else if (!isDeleting) {
            text = fullText.substring(0, text.length + 1);
        }
        if (!isDeleting && text == fullText) {
            delta = period;
            isDeleting = true;
        } else if (text.length == 0) {
            isDeleting = false;
            loopNumber++;
            delta = 500;
        }

        this.setState({ isDeleting, loopNumber, text });
        this.interval = setTimeout(this.whoAmI, delta);
    }
    componentWillUnmount() {
        clearTimeout(this.interval);
    }

    render() {
        const { text } = this.state;
        return (
            <Container className={styles.container}>
                <Text>{text}</Text>
            </Container>
        );
    }
}

export default TypewriterText