package todays_flag.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password", length = 255)
    private String password;
}
