const ChatInputFooter = () => {
    return (
        <View style={{...styles.footer, ...style}} {...rest}>
            <IconButton
                style={styles.icon}
                icon={require('../../../assets/icons/plus.png')}
                iconColor={palette.black}
                size={4 * vh}
                onPress={() => navigation.goBack()}
            />
            <Text style={styles.title}>{children}</Text>
        </View>
    );
}