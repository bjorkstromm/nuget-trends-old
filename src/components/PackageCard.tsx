import React from "react";
import Card from "react-bootstrap/Card";
import { SearchResult } from "../services/nugetService";

export interface PackageCardProps {
  packageId: string;
  backGround: string;
  metadata?: SearchResult;
}

const PackageCard: React.StatelessComponent<PackageCardProps> = (
  props: PackageCardProps
) => {
  return (
    <Card
      bg={
        props.backGround as
          | "primary"
          | "secondary"
          | "success"
          | "danger"
          | "warning"
          | "info"
          | "dark"
          | "light"
      }
      text="white"
      style={{ width: "18rem" }}
    >
      <Card.Header>{props.packageId}</Card.Header>
      {props.metadata !== undefined && (
        <Card.Body>
          <Card.Title>{props.metadata.version}</Card.Title>
          <Card.Text>{props.metadata.description}</Card.Text>
        </Card.Body>
      )}
    </Card>
  );
};

export default PackageCard;
