package com.lootopia.server.repository;

import com.lootopia.server.entity.Hunt;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HuntRepository extends JpaRepository<Hunt, Long> {
  Optional<Hunt> findByName(String name);

  Optional<Hunt> findBySlug(String slug);
}
