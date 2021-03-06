package ib.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ib.project.entity.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Integer> {

	Authority findByName(String name);
}
