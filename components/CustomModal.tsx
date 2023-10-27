import * as React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

export type CustomModalProps = {
  onClose: () => void;
  opened: boolean;
  data: any;
};

const CustomModal: React.FC<CustomModalProps> = ({ opened, onClose, data }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={opened}
      onRequestClose={onClose}
    >
      {!!data && (
        <View style={s.centeredView}>
          <View style={s.leftPart}>
            <Image
              style={{ flex: 1 }}
              resizeMode="contain"
              source={{ uri: data.image }}
            />
          </View>
          <View style={s.rightPart}>
            <Text style={s.text}>{data.title}</Text>
            <Text style={[s.text, { opacity: 0.6 }]}>{data.subtitle}</Text>
            <Text style={[s.text, { paddingTop: 10 }]}>{data.price}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={s.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  );
};

CustomModal.defaultProps = {};

const s = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 22,
    backgroundColor: "white",
    paddingHorizontal: 6,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 14,
  },
  leftPart: {
    flex: 1.2,
  },
  rightPart: {
    flex: 0.8,
    justifyContent: "center",
    paddingLeft: 6,
  },
  text: {
    fontWeight: "700",
    fontSize: 14,
    color: "black",
  },
});
export { CustomModal };
