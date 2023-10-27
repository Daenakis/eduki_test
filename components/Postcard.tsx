import { Image } from "expo-image";
import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

export type PostcardProps = {
  image: string;
  title: string;
  subtitle: string;
  price: string;
  onPress: ({image,title,subtitle,price}:any) => void;
};

const Postcard: React.FC<PostcardProps> = ({
  image,
  title,
  subtitle,
  price,
  onPress
}) => {
  const [loading, setLoading] = React.useState(true);
  return (
    <TouchableOpacity onPress={() => onPress({image,title,subtitle,price})} style={s.container}>
      <View style={s.dataCont}>
        <View>
          <Text style={s.title}>{title}</Text>
          <Text style={s.subtitle}>{subtitle}</Text>
        </View>
        <Text style={s.price}>{price}</Text>
      </View>
      <View style={s.imageCont}>
        <Image
          onLoadEnd={() => setLoading(false)}
          style={s.image}
          source={{ uri: image }}
        />
        {loading && (
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={"#000"} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

Postcard.defaultProps = {};

const s = StyleSheet.create({
  container: {
    height: 280,
    width: 150,
    alignItems: "center",
    justifyContent: "flex-end",
    marginHorizontal: 15,
  },
  dataCont: {
    borderWidth: 1,
    borderColor: "silver",
    height: 170,
    width: "100%",
    paddingHorizontal: 8,
    paddingTop: 80,
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  imageCont: {
    position: "absolute",
    top: 0,
    left: 10,
    height: 180,
    width: 130,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: "white",
    elevation: 2,
  },
  image: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: -0.5,
    color: "black",
  },
  subtitle: {
    fontSize: 10,
    opacity: 0.5,
    letterSpacing: -0.5,
    color: "black",
    paddingTop: 2,
  },
  price: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: -0.5,
    color: "black",
  },
});

export { Postcard };
